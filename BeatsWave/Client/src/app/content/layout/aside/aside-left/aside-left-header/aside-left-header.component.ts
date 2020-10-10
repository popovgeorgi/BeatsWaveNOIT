import { Component, Inject, OnInit } from '@angular/core';

import { Config } from '../../../../../config/config';
import { DOCUMENT } from '@angular/common';


@Component({
    selector: 'app-aside-left-header',
    templateUrl: './aside-left-header.component.html'
})
export class AsideLeftHeaderComponent implements OnInit {

    config: Config;
    brand: any = {};

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.config = new Config();
        this.brand = this.config.config.brand;
    }

    ngOnInit() {
    }

    toggleIconicSidebar() {
        if (this.document.body.classList.contains(Config.classes.iconicSidebar)) {
            this.document.body.classList.remove(Config.classes.iconicSidebar);
        } else {
            this.document.body.classList.add(Config.classes.iconicSidebar);
        }
    }

    hideSidebar() {
        this.document.body.classList.remove(Config.classes.openSidebar);
    }

}
