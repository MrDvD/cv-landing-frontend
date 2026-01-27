import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-expand-content',
  templateUrl: './expand-content.html',
  styleUrl: './expand-content.less',
})
export class ExpandContentComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) maxHeight: string = '';
  
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLElement>;
  
  isExpanded = false;
  shouldShowButton = false; 
  private resizeObserver?: ResizeObserver;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngAfterViewInit() {
    this.setupObserver();
  }

  private setupObserver() {
    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        this.checkOverflow();
      });

      if (this.contentWrapper) {
        this.resizeObserver.observe(this.contentWrapper.nativeElement);
      }
    });
  }

  private checkOverflow() {
    if (this.isExpanded) {
      return;
    }

    const element = this.contentWrapper.nativeElement;
    const originalStyleHeight = element.style.height;
    
    element.style.height = this.maxHeight;
    const hasOverflow = element.scrollHeight > element.offsetHeight + 1;
    element.style.height = originalStyleHeight;

    if (this.shouldShowButton !== hasOverflow) {
      this.zone.run(() => {
        this.shouldShowButton = hasOverflow;
        this.cdr.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  get currentHeight(): string | null {
    if (!this.shouldShowButton) return null;

    if (this.isExpanded && this.contentWrapper) {
      return `${this.contentWrapper.nativeElement.scrollHeight}px`;
    }
    return this.maxHeight;
  }
}