import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {AppServiceProxyModule} from './api/app-service-proxy.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {moduleHttpLoaderFactory} from './libs/services/ngx-translate-module-loader';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {LOADER_CONFIG} from './libs/const/ngx-ui-loader-config';
import {APP_INIT_PROVIDER} from './app.routes';
import {AppRoutingModule} from './app-routing.module';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { AuthInterceptor } from './auth/auth.interceptor';

registerLocaleData(en);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AppServiceProxyModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: moduleHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxUiLoaderModule.forRoot(LOADER_CONFIG),
  ],
  declarations: [AppComponent],
  providers: [
    APP_INIT_PROVIDER,
    {provide: LOCALE_ID, useValue: 'en-US'},
    {provide: NZ_I18N, useValue: en_US},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true  // 👈 quan trọng, để có thể add nhiều interceptor
    }
    // {
    //   provide: NZ_DATE_LOCALE, useValue: enDate
    // },
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: ReuseTabStrategy,
    //   deps: [ReuseTabService]
    // },
    // ComboCommonDisplayPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
