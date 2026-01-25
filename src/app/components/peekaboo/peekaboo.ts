import { Component } from '@angular/core';
import { DitherFilterComponent } from '../dithering-filter/dithering-filter';
import { I3WindowComponent } from '../i3-window/i3-window';

@Component({
  selector: 'app-peekaboo',
  imports: [DitherFilterComponent, I3WindowComponent],
  templateUrl: './peekaboo.html',
  styleUrl: './peekaboo.less',
})
export class PeekabooComponent {
  protected now = new Date();
  protected birthDate = new Date('2005-11-18');
  protected get age(): number {
    const ageDiff = this.now.getTime() - this.birthDate.getTime();
    return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  }
}
