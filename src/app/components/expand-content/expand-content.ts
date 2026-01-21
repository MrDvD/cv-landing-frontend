import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-expand-content',
  templateUrl: './expand-content.html',
  styleUrl: './expand-content.less',
})
export class ExpandContentComponent {
  @Input() maxHeight: string = '225px';
  @Input() showButtonText: string = 'Показать больше';
  @Input() hideButtonText: string = 'Скрыть';
  
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLElement>;
  
  isExpanded = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  get currentHeight(): string {
    if (this.isExpanded && this.contentWrapper) {
      return `${this.contentWrapper.nativeElement.scrollHeight}px`;
    }
    return this.maxHeight;
  }
}