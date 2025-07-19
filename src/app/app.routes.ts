// app.initializer.ts
import { APP_INITIALIZER, Provider } from '@angular/core';
import { AppInitService } from './app-init';

export function appInitializerFactory(appInitService: AppInitService) {
  return () => appInitService.load();
}

export const APP_INIT_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [AppInitService],
  multi: true,
};
