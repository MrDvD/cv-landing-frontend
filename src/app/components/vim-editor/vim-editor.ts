import { Component, inject, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TreeNode } from 'src/app/components/skills-tree/tree-node.model';

@Component({
  selector: 'app-vim-editor',
  standalone: true,
  imports: [],
  templateUrl: './vim-editor.html',
  styleUrl: './vim-editor.less',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class VimEditorComponent implements OnChanges {
  @Input({ required: true }) treeData: TreeNode[] = [];
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  protected formattedCode: SafeHtml = '';
  protected lineNumbers: SafeHtml = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['treeData']) {
      this.generateVimContent();
    }
  }

  private generateVimContent(): void {
    const lines: string[] = [];
    this.buildLines(this.treeData, 0, lines);

    const fullContent = lines.join('\n');
    
    const nums = lines.map((_, i) => i + 1).join('<br>');
    this.lineNumbers = this.sanitizer.bypassSecurityTrustHtml(nums);
    this.formattedCode = this.sanitizer.bypassSecurityTrustHtml(fullContent);
  }

  private buildLines(nodes: TreeNode[], depth: number, lines: string[]): void {
    const indent = '  '.repeat(depth);
    
    nodes.forEach(node => {
      const keySpan = `<span class="key">${node.name}</span>`;
      
      if (node.children && node.children.length > 0) {
        lines.push(`${indent}${keySpan}:`);
        this.buildLines(node.children, depth + 1, lines);
      } else {
        if (node.details && node.details.length > 0) {
          const valSpan = `<span class="val">${node.details.join(', ')}</span>`;
          lines.push(`${indent}${keySpan}: ${valSpan}`);
        } else {
          lines.push(`${indent}- <span class="val">${node.name}</span>`);
        }
      }
    });
  }
}