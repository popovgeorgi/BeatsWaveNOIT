import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './content/layout/layout.module';
import { MenuConfigService } from './core/services/menu-config.service';
import { SongsConfigService } from './core/services/songs-config.service';
import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { NgxSpinnerModule, NgxSpinnerService } from '../../node_modules/ngx-spinner';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ErrorInterceptorService } from './core/services/error-interceptor.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
        SnotifyModule
    ],
    providers: [
        NgxSpinnerService,
        MenuConfigService,
        SongsConfigService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
        SnotifyService,
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
