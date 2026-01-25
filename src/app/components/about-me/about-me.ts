import { Component } from '@angular/core';
import { PeekabooComponent } from '../peekaboo/peekaboo';
import { I3WindowComponent } from '../i3-window/i3-window';
import { VimEditorComponent } from '../vim-editor/vim-editor';

@Component({
  selector: 'app-about-me',
  imports: [PeekabooComponent, VimEditorComponent, I3WindowComponent],
  templateUrl: './about-me.html',
  styleUrl: './about-me.less',
})
export class AboutMeComponent {
  codeSnippet = `*soft_skills*:
  *personal*:
    - _обучаемость_
    - _ответственность_
    - _тайм-менеджмент_`;
}
