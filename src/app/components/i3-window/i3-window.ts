import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-i3-window',
  imports: [],
  templateUrl: './i3-window.html',
  styleUrl: './i3-window.less',
})
export class I3WindowComponent {
  @Input({required: true}) windowTitle = "";
}
