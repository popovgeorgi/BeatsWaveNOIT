import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './content/layout/layout.module';
import { MenuConfigService } from './core/services/menu-config.service';
import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { NgxSpinnerModule, NgxSpinnerService } from '../../node_modules/ngx-spinner';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ErrorInterceptorService } from './core/services/error-interceptor.service';
import { AuthGuardService } from './core/services/auth-guard.service';
import { IonicModule } from '@ionic/angular';
import { GoogleAnalyticsService } from './core/services/google-analytics.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    SnotifyModule.forRoot(),
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    NgxSpinnerService,
    MenuConfigService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    AuthGuardService,
    GoogleAnalyticsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
