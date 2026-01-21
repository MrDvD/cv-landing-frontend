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
  
  @Input() treeData: TreeNode[] = [
    {
      name: 'backend',
      children: [
        { 
          name: 'Java',
          details: ['Maven'],
        },
        { 
          name: 'Python',
          details: ['Flask', 'asyncio']
        },
        { name: 'C' },
        { name: 'Bash' }
      ]
    },
    {
      name: 'frontend',
      children: [
        { name: 'HTML' },
        {
          name: 'CSS',
          details: ['SASS', 'SCSS', 'LESS'],
        },
        { name: 'JavaScript' },
        { 
          name: 'TypeScript',
          details: ['Angular', 'RxJS']
        }
      ]
    },
    {
      name: 'инструменты',
      children: [
        { 
          name: 'Git',
          details: ['GitFlow']
        },
        { name: 'Docker' },
        { name: 'Node.js' },
        {
          name: 'libvirt',
          details: ['KVM'],
        },
        { name: 'PostgreSQL' }
      ]
    },
    {
      name: 'теория',
      children: [
        { name: 'алгоритмы и структуры данных' },
        { name: 'OOP' },
        { name: 'SOLID' },
        { name: 'паттерны проектирования' }
      ]
    },
    {
      name: 'os',
          children: [
            {
              name: 'Debian-based',
              children: [
                {
                  name: 'Debian',
                },
                {
                  name: 'Ubuntu',
                },
                {
                  name: 'Raspberry Pi OS',
                },
              ],
            },
            {
              name: 'RedHat-based',
              children: [
                {
                  name: 'CentOS',
                },
              ],
            },
          ],
    }
  ];
}