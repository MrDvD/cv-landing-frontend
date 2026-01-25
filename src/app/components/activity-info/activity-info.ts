import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.html',
  styleUrls: ['./activity-info.less']
})
export class ActivityInfoComponent {
  @Input({required: true}) activity: Activity = { name: '', subtitle: '', description: '' };
  
  showAdditionalTags = false;
  
  get hasAdditionalTags(): boolean {
    const additional = this.activity.tags?.additional;
    if (additional && additional.length > 0) {
      return true;
    }
    return false;
  }
  
  toggleAdditionalTags(): void {
    this.showAdditionalTags = !this.showAdditionalTags;
  }
}