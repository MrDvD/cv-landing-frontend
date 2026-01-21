import { Component, signal } from '@angular/core';
import { ActivityInfoComponent } from './components/activity-info/activity-info';
import { SkillsTreeComponent } from './components/skills-tree/skills-tree';
import { ExpandContentComponent } from './components/expand-content/expand-content';

@Component({
  selector: 'app-root',
  imports: [ActivityInfoComponent, SkillsTreeComponent, ExpandContentComponent],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('cv-landing');
}
