import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { LayoutModule } from '../layout/layout.module';
import { PartialsModule } from '../partials/partials.module';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from '../../core/core.module';
import { LandingPageComponent } from './snippets/landing-page/landing-page.component';
import { DemoPageComponent } from './snippets/demo-page/demo-page.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        PagesComponent,
        ErrorPageComponent,
        LandingPageComponent,
        DemoPageComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        PerfectScrollbarModule,
        SlickCarouselModule,
        LayoutModule,
        PartialsModule,
        ComponentsModule,
        CoreModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class PagesModule { }
