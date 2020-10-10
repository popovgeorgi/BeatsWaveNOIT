import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';

import { LocalStorageService } from '../../../core/services/local-storage.service';
import { SkinService } from '../../../core/services/skin.service';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html'
})
export class ComponentsComponent implements OnInit, OnDestroy {

    themeClass = 'theme-light';

    skinSubscription: Subscription;
    routerSubscription: Subscription;

    @ViewChild('perfectScroll', {static: false}) perfectScroll: PerfectScrollbarComponent;

    constructor(@Inject(DOCUMENT) private document: Document,
                private router: Router,
                private localStorageService: LocalStorageService,
                private skinService: SkinService) { }

    ngOnInit() {
        const themeSkin = this.localStorageService.getThemeSkin();
        if (themeSkin) {
            this.document.body.classList.remove(this.themeClass);
            this.themeClass = 'theme-' + themeSkin.theme;
            this.document.body.classList.add(this.themeClass);
        }

        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
          if (skin) {
              this.document.body.classList.remove(this.themeClass);
              this.themeClass = 'theme-' + skin.theme;
              this.document.body.classList.add(this.themeClass);
          }
        });

        this.routerSubscription = this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return false;
            }
            this.perfectScroll.directiveRef.update();
            this.perfectScroll.directiveRef.scrollToTop(0, 100);
        });
    }

    // Set class to header on scroll of body
    psBodyScroll(event) {
        const scrollTop = event.target.scrollTop;
        const header = this.document.getElementById('header');
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }

}
