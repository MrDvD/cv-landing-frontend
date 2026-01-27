import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './app/services/config/config';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    ConfigService,
    provideAppInitializer(() => {
      const config = inject(ConfigService);
      return config.loadConfig();
    }),
  ],
}).catch((err) => console.error(err));
