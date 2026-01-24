import { effect, inject, Injectable, RendererFactory2, signal, WritableSignal } from "@angular/core";

export interface ThemeContext<T> {
  getTheme(): WritableSignal<T>;
  setTheme(obj: T): void;
}

@Injectable()
export class DefaultThemeContext implements ThemeContext<string> {
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private theme = signal<string>("light");

  constructor() {
    effect(() => {
      const current = this.theme();
      const classesToRemove = Array.from(document.body.classList)
        .filter(className => className.startsWith('theme-'));
      classesToRemove.forEach(cls => this.renderer.removeClass(document.body, cls));
      this.renderer.addClass(document.body, `theme-${current}`);
    });
  }

  public getTheme(): WritableSignal<string> {
    return this.theme;
  }

  public setTheme(obj: string): void {
    this.theme.set(obj);
  }
}