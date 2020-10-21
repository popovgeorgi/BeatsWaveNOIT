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
        BrowserAnimationsModule
    ],
    providers: [
        NgxSpinnerService,
        MenuConfigService,
        SongsConfigService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
