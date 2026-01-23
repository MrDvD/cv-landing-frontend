import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.html',
  styleUrls: ['./activity-info.less']
})
export class ActivityInfoComponent {
  @Input() activityName: string = '';
  @Input() activitySubtitle: string = '';
  @Input() metaLabel: string = '';
  @Input() description: string = '';
  @Input() tags: {
    core: string[];
    additional?: string[];
  } = { core: [] };
  
  showAdditionalTags = false;
  
  get hasAdditionalTags(): boolean {
    const additional = this.tags.additional;
    if (additional && additional.length > 0) {
      return true;
    }
    return false;
  }
  
  toggleAdditionalTags(): void {
    this.showAdditionalTags = !this.showAdditionalTags;
  }
}