import { Component, inject } from '@angular/core';
import { PeekabooComponent } from '../peekaboo/peekaboo';
import { I3WindowComponent } from '../i3-window/i3-window';
import { VimEditorComponent } from '../vim-editor/vim-editor';
import { ServiceToken } from 'src/app/services/tokens';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-about-me',
  imports: [PeekabooComponent, VimEditorComponent, I3WindowComponent, AsyncPipe],
  templateUrl: './about-me.html',
  styleUrl: './about-me.less',
})
export class AboutMeComponent {
  private skillsRepo = inject(ServiceToken.SKILLS_REPOSITORY);
  protected softskills$ = this.skillsRepo.getSoft();
}
