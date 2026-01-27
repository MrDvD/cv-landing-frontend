import { Component, inject } from '@angular/core';
import { ActivityInfoComponent } from '../activity-info/activity-info';
import { SkillsTreeComponent } from '../skills-tree/skills-tree';
import { ExpandContentComponent } from '../expand-content/expand-content';
import { Observable } from 'rxjs';
import { ServiceToken } from 'src/app/services/tokens';
import { TreeNode } from '../skills-tree/tree-node.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-obsidian',
  imports: [ActivityInfoComponent, SkillsTreeComponent, ExpandContentComponent, AsyncPipe],
  templateUrl: './obsidian.html',
  styleUrl: './obsidian.less',
})
export class ObsidianComponent {
  private activityRepo = inject(ServiceToken.ACTIVITY_REPOSITORY);
  private skillsRepo = inject(ServiceToken.SKILLS_REPOSITORY);
  protected projects$: Observable<Activity[]> = this.activityRepo.getAll('projects');
  protected education$: Observable<Activity[]> = this.activityRepo.getAll('education');
  protected events$: Observable<Activity[]> = this.activityRepo.getAll('events');
  protected hardSkills$: Observable<TreeNode[]> = this.skillsRepo.getHard();
}
