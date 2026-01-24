import { Component, signal } from '@angular/core';
import { ActivityInfoComponent } from './components/activity-info/activity-info';
import { SkillsTreeComponent } from './components/skills-tree/skills-tree';
import { ExpandContentComponent } from './components/expand-content/expand-content';
import { AboutMeComponent } from './components/about-me/about-me';
import { I3WindowComponent } from './components/i3-window/i3-window';
import { I3BarComponent } from './components/i3-bar/i3-bar';

@Component({
  selector: 'app-root',
  imports: [ActivityInfoComponent, SkillsTreeComponent, ExpandContentComponent, AboutMeComponent, I3WindowComponent, I3BarComponent],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('cv-landing');
}
