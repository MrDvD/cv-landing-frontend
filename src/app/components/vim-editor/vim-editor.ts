import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-vim-editor',
  standalone: true,
  imports: [],
  templateUrl: './vim-editor.html',
  styleUrl: './vim-editor.less',
  encapsulation: ViewEncapsulation.None,
})
export class VimEditorComponent implements OnInit {
  @Input({required: true}) rawContent: string = '';
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  protected formattedCode: SafeHtml = '';
  protected lineNumbers: string = '';

  ngOnInit(): void {
    this.lineNumbers = this.rawContent.split('\n').map((_, i) => i + 1).join('<br>');

    let html = this.rawContent
      .replace(/\*(.*?)\*/g, '<span class="key">$1</span>')
      .replace(/_(.*?)_/g, '<span class="val">$1</span>');

    this.formattedCode = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}