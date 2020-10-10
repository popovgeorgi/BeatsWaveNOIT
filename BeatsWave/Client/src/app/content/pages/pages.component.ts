import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { SkinService } from '../../core/services/skin.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit, OnDestroy {

    themeClass = 'theme-light';

    skinSubscription: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document,
                private skinService: SkinService) { }

    ngOnInit() {
        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if (skin) {
                this.themeClass = 'theme-' + skin.theme;
                this.document.body.classList.add(this.themeClass);
            }
        });
    }

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
    }

}
