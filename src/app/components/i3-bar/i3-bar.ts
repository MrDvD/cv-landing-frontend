import { Component } from '@angular/core';

@Component({
  selector: 'app-i3-bar',
  imports: [],
  templateUrl: './i3-bar.html',
  styleUrl: './i3-bar.less',
})
export class I3BarComponent {
  get currentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
