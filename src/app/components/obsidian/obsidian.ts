import { Component } from '@angular/core';
import { ActivityInfoComponent } from '../activity-info/activity-info';
import { SkillsTreeComponent } from '../skills-tree/skills-tree';
import { ExpandContentComponent } from '../expand-content/expand-content';

@Component({
  selector: 'app-obsidian',
  imports: [ActivityInfoComponent, SkillsTreeComponent, ExpandContentComponent],
  templateUrl: './obsidian.html',
  styleUrl: './obsidian.less',
})
export class ObsidianComponent {
  protected activityData: Record<string, Activity[]> = {
    projects: [
      {
        name: 'Лабораторная работа по программированию',
        subtitle: 'Многопоточный клиент-серверный менеджер коллекции.',
        metaLabel: '100%',
        description: 'Разработал приложение и успешно защитил работу на максимальный балл.',
        tags: {
          core: ['Java', 'PostgreSQL', 'Docker', 'gRPC'],
          additional: ['Protobuf', 'Compose', 'Maven', 'SOLID', 'SOA']
        }
      },
      {
        name: 'Kulibin Third',
        subtitle: 'Веб-приложение, созданное полностью с помощью ИИ-инструментов.',
        description: 'Руководил разработкой, вёл репозиторий.',
        tags: {
          core: ['NodeJS', 'Copilot', 'Vanilla'],
          additional: ['HTML', 'CSS', 'JavaScript']
        }
      }
    ],
    activity: [
      {
        name: 'Мастерская объединения ОЛИМП',
        subtitle: 'Программирование микроконтроллеров.',
        description: 'Писал простые скрипты в STM32CubeIDE.',
        tags: { core: ['C', 'STM32'] }
      }
    ],
    education: [
      {
        name: 'Интенсив по JavaScript',
        subtitle: 'Обновил знания по JS & TS, получил опыт от специалистов Т-Банка.',
        description: 'Посмотреть репозиторий проекта, посмотреть репозиторий курсовой',
        tags: {
          core: ['JavaScript', 'TypeScript', 'Angular'],
          additional: ['SCSS', 'HTML5', 'Vanilla', 'Fastify']
        }
      }
    ]
  };
  protected skills = [
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
