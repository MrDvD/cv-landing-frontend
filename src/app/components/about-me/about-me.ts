import { Component } from '@angular/core';
import { PeekabooComponent } from '../peekaboo/peekaboo';
import { SoftSkillsComponent } from '../softskills/softskills';
import { I3WindowComponent } from '../i3-window/i3-window';

@Component({
  selector: 'app-about-me',
  imports: [PeekabooComponent, SoftSkillsComponent, I3WindowComponent],
  templateUrl: './about-me.html',
  styleUrl: './about-me.less',
})
export class AboutMeComponent {}
