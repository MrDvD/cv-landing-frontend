import { Component } from '@angular/core';
import { DitherFilterComponent } from '../dithering-filter/dithering-filter';
import { I3WindowComponent } from '../i3-window/i3-window';

@Component({
  selector: 'app-peekaboo',
  imports: [DitherFilterComponent, I3WindowComponent],
  templateUrl: './peekaboo.html',
  styleUrl: './peekaboo.less',
})
export class PeekabooComponent {}
