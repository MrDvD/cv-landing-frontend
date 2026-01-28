import { Component, Input, ElementRef, OnDestroy, inject, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { Activity } from './activity';

@Component({
  selector: 'app-activity-info',
  standalone: true,
  imports: [],
  templateUrl: './activity-info.html',
  styleUrls: ['./activity-info.less']
})
export class ActivityInfoComponent implements OnInit, OnDestroy {
  @Input({required: true}) activity!: Activity;
  @ViewChild('attachmentContainer') attachmentContainer!: ElementRef;
  
  private clickListener?: (event: MouseEvent) => void;
  private cdr = inject(ChangeDetectorRef);
  
  showAdditionalTags = false;
  showAttachments = false;
  sysInfo = { pid: 0, hash: '' };

  ngOnInit() {
    const seed = this.activity.name.length;
    this.sysInfo = {
      pid: Math.floor(seed * 123 + 456),
      hash: Math.abs(seed * 987654321).toString(16).substring(0, 7)
    };
  }

  isExternalLink(url: string): boolean {
    return url.startsWith('http') || url.startsWith('www');
  }

  get dateRange(): string {
    const { start, end } = this.activity.period;

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    };

    const formattedStart = formatDate(start);
    if (end) {
      return `${formattedStart} — ${formatDate(end)}`;
    } else {
      return formattedStart;
    }
  }

  get hasAdditionalTags(): boolean {
    return !!this.activity.tags?.additional?.length;
  }

  toggleAdditionalTags(): void {
    this.showAdditionalTags = !this.showAdditionalTags;
  }

  toggleAttachments(): void {
    this.showAttachments = !this.showAttachments;
    if (this.showAttachments) this.addOutsideClickListener();
    else this.removeOutsideClickListener();
  }

  private addOutsideClickListener(): void {
    this.clickListener = (event: MouseEvent) => {
      if (!this.attachmentContainer.nativeElement.contains(event.target)) {
        this.showAttachments = false;
        this.removeOutsideClickListener();
        this.cdr.detectChanges();
      }
    };
    document.addEventListener('click', this.clickListener);
  }

  private removeOutsideClickListener(): void {
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
      this.clickListener = undefined;
    }
  }

  ngOnDestroy(): void {
    this.removeOutsideClickListener();
  }
}