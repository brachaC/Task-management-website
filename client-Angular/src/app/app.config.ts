import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch} from '@angular/common/http';

import { routes } from './app.routes';
import { ConfigurationService } from './services/configuration.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    
    provideHttpClient(withFetch()),
    {
       provide: APP_INITIALIZER,
       useFactory: initConfigValues, 
       deps: [ConfigurationService],
        multi: true 
    },
  ]
};
export function initConfigValues(config: ConfigurationService) {
  return (() => config.initConfiguration('/config'));
}
