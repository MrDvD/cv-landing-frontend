import { Component } from '@angular/core';
import { ActivityInfoComponent } from '../activity-info/activity-info';
import { SkillsTreeComponent } from '../skills-tree/skills-tree';
import { ExpandContentComponent } from '../expand-content/expand-content';

@Component({
  selector: 'app-obsidian',
  imports: [ActivityInfoComponent, SkillsTreeComponent, ExpandContentComponent],
  templateUrl: './obsidian.html',
  styleUrl: './obsidian.less',
})
export class ObsidianComponent {

}
