import { ElementRef, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges, Component } from '@angular/core';

@Component({
  selector: 'app-dither-filter',
  template: `<canvas #canvas></canvas>`,
  styleUrl: './dithering-filter.less',
})
export class DitherFilterComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  @Input() imageUrl: string = '';
  @Input() scale: number = 4.0;       // Размер "зерна" дизеринга
  @Input() brightness: number = 0.0;  // Смещение яркости
  @Input() contrast: number = 2.7;    // Множитель контраста
  @Input() color: [number, number, number] = [1.0, 1.0, 1.0]; // RGB цвет

  private gl?: WebGLRenderingContext;
  private program?: WebGLProgram;
  private texture?: WebGLTexture;
  private image?: HTMLImageElement;

  ngAfterViewInit() {
    this.initWebGL();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['scale'] || changes['brightness'] || changes['contrast'] || changes['color']) && this.gl) {
      this.render();
    }
    if (changes['imageUrl'] && this.imageUrl) {
      this.loadImage();
    }
  }

  private initWebGL() {
    const canvas = this.canvasRef.nativeElement;
    this.gl = canvas.getContext('webgl')!;
    if (!this.gl) return;

    const vs = `
      attribute vec2 position;
      varying vec2 vTexCoord;
      void main() {
        vTexCoord = vec2(position.x * 0.5 + 0.5, 1.0 - (position.y * 0.5 + 0.5));
        gl_Position = vec4(position, 0, 1);
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

      // Оптимизированная матрица Байера через массив
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
        
        // Применяем настройки
        gray = (gray - 0.5) * uContrast + 0.5 + uBrightness;
        
        float threshold = getBayer(gl_FragCoord.xy);
        float limit = gray > threshold ? 1.0 : 0.0;
        
        gl_FragColor = vec4(uColor * limit, 1.0);
      }
    `;

    this.program = this.createProgram(this.gl, vs, fs);
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

    gl.useProgram(this.program);

    // Установка параметров (Uniforms)
    gl.uniform1f(gl.getUniformLocation(this.program, 'uScale'), this.scale);
    gl.uniform1f(gl.getUniformLocation(this.program, 'uBrightness'), this.brightness);
    gl.uniform1f(gl.getUniformLocation(this.program, 'uContrast'), this.contrast);
    gl.uniform3fv(gl.getUniformLocation(this.program, 'uColor'), this.color);

    // Буфер координат
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    // Текстура
    this.texture = gl.createTexture()!;
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
    const prg = gl.createProgram()!;
    gl.attachShader(prg, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prg, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prg);
    return prg;
  }
}