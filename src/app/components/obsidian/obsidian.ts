import { Component, inject } from '@angular/core';
import { ActivityInfoComponent } from '../activity-info/activity-info';
import { SkillsTreeComponent } from '../skills-tree/skills-tree';
import { ExpandContentComponent } from '../expand-content/expand-content';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ServiceToken } from 'src/app/services/tokens';
import { TreeNode } from '../skills-tree/tree-node.model';
import { AsyncPipe } from '@angular/common';
import { Activity } from '../activity-info/activity';

@Component({
  selector: 'app-obsidian',
  imports: [ActivityInfoComponent, SkillsTreeComponent, ExpandContentComponent, AsyncPipe],
  templateUrl: './obsidian.html',
  styleUrl: './obsidian.less',
})
export class ObsidianComponent {
  private activityRepo = inject(ServiceToken.ACTIVITY_REPOSITORY);
  private tagsRepo = inject(ServiceToken.TAGS_REPOSITORY);
  private skillsRepo = inject(ServiceToken.SKILLS_REPOSITORY);
  private attachmentRepo = inject(ServiceToken.ATTACHMENTS_REPOSITORY);

  protected projects$: Observable<Activity[]> = this.activityRepo.getAll('projects');
  protected education$: Observable<Activity[]> = this.activityRepo.getAll('education');
  protected events$: Observable<Activity[]> = this.activityRepo.getAll('events');
  protected hardSkills$: Observable<TreeNode[]> = this.skillsRepo.getHard();

  ngOnInit() {
    this.projects$ = this.enrichWithAttachments(this.enrichWithTags(this.projects$));
    this.education$ = this.enrichWithAttachments(this.enrichWithTags(this.education$));
    this.events$ = this.enrichWithAttachments(this.enrichWithTags(this.events$));
  }

  private enrichWithTags(source$: Observable<Activity[]>): Observable<Activity[]> {
    return source$.pipe(
      switchMap(activities => {
        if (!activities?.length) {
          return of([]);
        }
        const enriched = activities.map(activity => {
          return forkJoin({
            core: this.tagsRepo.getByActivityId(activity.id, 'core' as any),
            additional: this.tagsRepo.getByActivityId(activity.id, 'additional' as any)
          }).pipe(
            map(({ core, additional }) => ({
              ...activity,
              tags: {
                core: core.map(t => t.name),
                additional: additional.map(t => t.name)
              }
            }))
          );
        });
        return forkJoin(enriched);
      })
    );
  }

  private enrichWithAttachments(source$: Observable<Activity[]>): Observable<Activity[]> {
    return source$.pipe(
      switchMap(activities => {
        if (!activities?.length) {
          return of([]);
        }
        const enriched = activities.map(activity => 
          this.attachmentRepo.get(activity.id).pipe(
            map(attachments => ({
              ...activity,
              attachments: attachments
            }))
          )
        );
        return forkJoin(enriched);
      })
    );
  }
}
