import { Component, Input } from '@angular/core';
import { TreeNode } from './tree-node.model';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-skills-tree',
  imports: [NgTemplateOutlet],
  templateUrl: './skills-tree.html',
  styleUrls: ['./skills-tree.less']
})
export class SkillsTreeComponent {
  @Input() title: string = '.';
  
  @Input({required: true}) treeData: TreeNode[] = [];
}