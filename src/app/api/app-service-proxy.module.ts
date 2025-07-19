import { NgModule } from '@angular/core';
import {getDefaultUrl} from './app-api-url.service';
import {API_BASE_URL, ApiClient} from './api.client';


@NgModule({
  providers: [
    { provide: API_BASE_URL, useFactory: getDefaultUrl },
    ApiClient
  ],
})
export class AppServiceProxyModule {}
