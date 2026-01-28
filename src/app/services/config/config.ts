import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  skillsApiBase: string;
  activityApiBase: string;
  tagsApiBase: string;
}

@Injectable()
export class ConfigService {
  private http = inject(HttpClient);
  private config: AppConfig | null = null;

  public async loadConfig(): Promise<void> {
    this.config = await firstValueFrom(
      this.http.get<AppConfig>('/assets/config.json')
    );
  }

  public get settings(): AppConfig {
    if (!this.config) {
      throw new Error('Config not loaded');
    }
    return this.config;
  }
}