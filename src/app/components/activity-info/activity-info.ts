import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-info',
  imports: [],
  templateUrl: './activity-info.html',
  styleUrl: './activity-info.less',
})
export class ActivityInfoComponent {
  @Input() activityName: string = '';
  @Input() activitySubtitle: string = '';
  @Input() metaLabel: string = '';
  @Input() description: string = '';
  @Input() tags: string[] = [];
}
