import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './content/layout/layout.module';
import { LoadingService } from './core/services/loading.service';
import { MenuConfigService } from './core/services/menu-config.service';
import { SongsConfigService } from './core/services/songs-config.service';
import { TokenInterceptorService } from './core/services/token-interceptor.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        HttpClientModule
    ],
    providers: [
        LoadingService,
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
