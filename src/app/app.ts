import { Component, computed, inject } from '@angular/core';
import { ServiceToken } from './services/tokens';
import { DefaultThemeContext } from './services/context/theme-context';
import { ObsidianComponent } from './components/obsidian/obsidian';
import { AboutMeComponent } from './components/about-me/about-me';
import { I3WindowComponent } from './components/i3-window/i3-window';
import { I3BarComponent } from './components/i3-bar/i3-bar';

@Component({
  selector: 'app-root',
  imports: [ObsidianComponent, AboutMeComponent, I3WindowComponent, I3BarComponent],
  providers: [
    {
      provide: ServiceToken.THEME_CONTEXT,
      useClass: DefaultThemeContext,
    },
  ],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  private themeContext = inject(ServiceToken.THEME_CONTEXT);
  public themeClass = computed(() => `theme-${this.themeContext.getTheme()()}`);
}
