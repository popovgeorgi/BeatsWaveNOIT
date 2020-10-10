import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SimpleModalModule } from 'ngx-simple-modal';
import { DefaultSimpleModalOptionConfig } from 'ngx-simple-modal';
import { defaultSimpleModalOptions } from 'ngx-simple-modal';

import { AsideLeftComponent } from './aside/aside-left/aside-left.component';
import { AsideLeftHeaderComponent } from './aside/aside-left/aside-left-header/aside-left-header.component';
import { MenuSectionComponent } from './aside/menu-section/menu-section.component';
import { AsideRightComponent } from './aside/aside-right/aside-right.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlayerComponent } from './player/player.component';
import { SectionComponent } from './section/section.component';
import { PartialsModule } from '../partials/partials.module';
import { ProfileComponent } from './header/profile/profile.component';
import { LanguageComponent } from './header/language/language.component';
import { SearchComponent } from './header/search/search.component';
import { LoginComponent } from './header/login/login.component';
import { AuthService } from 'src/app/core/services/auth.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AsideLeftComponent,
        AsideLeftHeaderComponent,
        AsideRightComponent,
        MenuSectionComponent,
        HeaderComponent,
        FooterComponent,
        PlayerComponent,
        SectionComponent,
        ProfileComponent,
        LanguageComponent,
        SearchComponent,
        LoginComponent
    ],
    exports: [
        AsideLeftComponent,
        AsideLeftHeaderComponent,
        AsideRightComponent,
        MenuSectionComponent,
        HeaderComponent,
        FooterComponent,
        PlayerComponent,
        SectionComponent,
        ProfileComponent,
        SearchComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        PerfectScrollbarModule,
        SlickCarouselModule,
        PartialsModule,
        RouterModule,
        ReactiveFormsModule,
        SimpleModalModule.forRoot({container: document.body})
    ],
    entryComponents: [
        LanguageComponent,
        LoginComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: DefaultSimpleModalOptionConfig,
            useValue: {...defaultSimpleModalOptions, ...{
                wrapperDefaultClasses: 'simple-modal modal fade',
                wrapperClass: 'show',
                closeOnEscape: true,
                closeOnClickOutside: true,
                animationDuration: 1000,
            }}
        },
        AuthService
    ]
})
export class LayoutModule { }
