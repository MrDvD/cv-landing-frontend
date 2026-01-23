import { Component } from '@angular/core';
import { DitherFilterComponent } from '../dithering-filter/dithering-filter';

@Component({
  selector: 'app-peekaboo',
  imports: [DitherFilterComponent],
  templateUrl: './peekaboo.html',
  styleUrl: './peekaboo.less',
})
export class PeekabooComponent {}
