import { ElementRef, Input, AfterViewInit, ViewChild, Component, effect, computed, inject } from '@angular/core';
import { ServiceToken } from 'src/app/services/tokens';

@Component({
  selector: 'app-dither-filter',
  template: `<canvas #canvas></canvas>`,
  styleUrl: './dithering-filter.less',
})
export class DitherFilterComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private themeContext = inject(ServiceToken.THEME_CONTEXT);

  private themeColor = computed(() => {
    this.themeContext.getTheme()(); 

    const bodyStyles = getComputedStyle(document.body);
    const primaryColor = bodyStyles.getPropertyValue('--black-color').trim();

    return this.hexToRgb(primaryColor.startsWith('#') ? primaryColor : '#ffffff');
  });

  constructor() {
    effect(() => {
      this.color = this.themeColor();
      this.render();
    });
  }

  private hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  }
  
  @Input() imageUrl: string = '';
  @Input() scale: number = 4.0;
  @Input() brightness: number = 0.0;
  @Input() contrast: number = 2.7;
  @Input() color: [number, number, number] = [1.0, 1.0, 1.0];

  private gl?: WebGLRenderingContext;
  private program?: WebGLProgram;
  private texture?: WebGLTexture;
  private image?: HTMLImageElement;

  ngAfterViewInit() {
    this.initWebGL();
  }

  private initWebGL() {
    const canvas = this.canvasRef.nativeElement;
    this.gl = canvas.getContext('webgl', { alpha: true })!;
    if (!this.gl) return;

    const gl = this.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const vs = `
      attribute vec2 position;
      varying vec2 vTexCoord;
      void main() {
        vTexCoord = vec2(position.x * 0.5 + 0.5, 1.0 - (position.y * 0.5 + 0.5));
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision mediump float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uScale;
      uniform float uBrightness;
      uniform float uContrast;
      uniform vec3 uColor;

      float getBayer(vec2 uv) {
        vec2 p = floor(uv / uScale);
        int x = int(mod(p.x, 4.0));
        int y = int(mod(p.y, 4.0));
        int m = x + y * 4;
        if (m == 0) return 0.0625; if (m == 8) return 0.5625;
        if (m == 2) return 0.1875; if (m == 10) return 0.6875;
        if (m == 12) return 0.8125; if (m == 4) return 0.3125;
        if (m == 14) return 0.9375; if (m == 6) return 0.4375;
        if (m == 3) return 0.25; if (m == 11) return 0.75;
        if (m == 1) return 0.125; if (m == 9) return 0.625;
        if (m == 15) return 1.0; if (m == 7) return 0.5;
        if (m == 13) return 0.875; if (m == 5) return 0.375;
        return 0.0;
      }

      void main() {
        vec4 texColor = texture2D(uTexture, vTexCoord);
        float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
        
        gray = (gray - 0.5) * uContrast + 0.5 + uBrightness;
        
        float threshold = getBayer(gl_FragCoord.xy);
        float limit = gray > threshold ? 1.0 : 0.0;
        float alpha = 1.0 - limit;
        
        gl_FragColor = vec4(uColor, alpha);
      }
    `;

    this.program = this.createProgram(gl, vs, fs);
    this.loadImage();
  }

  private loadImage() {
    this.image = new Image();
    this.image.crossOrigin = "Anonymous";
    this.image.src = this.imageUrl;
    this.image.onload = () => this.render();
  }

  private render() {
    if (!this.gl || !this.program || !this.image) return;
    const gl = this.gl;
    const canvas = this.canvasRef.nativeElement;

    canvas.width = this.image.width;
    canvas.height = this.image.height;
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program);

    gl.uniform1f(gl.getUniformLocation(this.program, 'uScale'), this.scale);
    gl.uniform1f(gl.getUniformLocation(this.program, 'uBrightness'), this.brightness);
    gl.uniform1f(gl.getUniformLocation(this.program, 'uContrast'), this.contrast);
    gl.uniform3fv(gl.getUniformLocation(this.program, 'uColor'), this.color);
    
    gl.uniform1i(gl.getUniformLocation(this.program, 'uTexture'), 0);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  private createProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram {
    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prg = gl.createProgram();
    gl.attachShader(prg, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prg, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prg);
    return prg;
  }
}