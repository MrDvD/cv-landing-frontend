import { Component } from '@angular/core';
import { PeekabooComponent } from '../peekaboo/peekaboo';
import { SoftSkillsComponent } from '../softskills/softskills';

@Component({
  selector: 'app-about-me',
  imports: [PeekabooComponent, SoftSkillsComponent],
  templateUrl: './about-me.html',
  styleUrl: './about-me.less',
})
export class AboutMeComponent {
  get currentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
