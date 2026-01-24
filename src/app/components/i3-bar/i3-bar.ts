import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ServiceToken } from 'src/app/services/tokens';

@Component({
  selector: 'app-i3-bar',
  imports: [],
  templateUrl: './i3-bar.html',
  styleUrl: './i3-bar.less',
})
export class I3BarComponent implements OnDestroy {
  private themeContext = inject(ServiceToken.THEME_CONTEXT);
  public currentTime = signal(this.formatTime());
  private timerId = setInterval(() => {
    this.currentTime.set(this.formatTime());
  }, 15000);
  public themes = [
    { name: "light", active: true },
    { name: "dark", active: false },
  ];

  public selectTheme(selectedTheme: { name: string; active: boolean }): void {
    this.themes.forEach(t => t.active = (t === selectedTheme));
    this.themeContext.setTheme(selectedTheme.name);
  }

  public formatTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
