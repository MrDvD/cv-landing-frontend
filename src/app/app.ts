import { Component, computed, inject } from '@angular/core';
import { ServiceToken } from './services/tokens';
import { DefaultThemeContext } from './services/context/theme-context';
import { ObsidianComponent } from './components/obsidian/obsidian';
import { AboutMeComponent } from './components/about-me/about-me';
import { I3WindowComponent } from './components/i3-window/i3-window';
import { I3BarComponent } from './components/i3-bar/i3-bar';
import { DefaultActivityRepository } from './services/activity/repository';
import { DefaultSkillsRepository } from './services/skills/repository';
import { DefaultTagsRepository } from './services/tags/repository';

@Component({
  selector: 'app-root',
  imports: [ObsidianComponent, AboutMeComponent, I3WindowComponent, I3BarComponent],
  providers: [
    {
      provide: ServiceToken.THEME_CONTEXT,
      useClass: DefaultThemeContext,
    },
    {
      provide: ServiceToken.ACTIVITY_REPOSITORY,
      useClass: DefaultActivityRepository,
    },
    {
      provide: ServiceToken.SKILLS_REPOSITORY,
      useClass: DefaultSkillsRepository,
    },
    {
      provide: ServiceToken.TAGS_REPOSITORY,
      useClass: DefaultTagsRepository,
    },
  ],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  private themeContext = inject(ServiceToken.THEME_CONTEXT);
  public themeClass = computed(() => `theme-${this.themeContext.getTheme()()}`);
}
