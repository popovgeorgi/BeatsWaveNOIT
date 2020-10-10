import { Component, Input, OnInit } from '@angular/core';

import { MenuConfigService } from '../../../../core/services/menu-config.service';
import { SearchService } from '../../../../core/services/search.service';
import { LoginComponent } from '../login/login.component';
import {SimpleModalService} from 'ngx-simple-modal';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    @Input() user: any = {};

    userMenu: any = [];

    constructor(private searchService: SearchService,
                private menuConfigService: MenuConfigService,
                private simpleModalService: SimpleModalService) {
        this.userMenu = this.menuConfigService.userMenuItems;
    }

    ngOnInit() {
    }

    closeSearchResult() {
        this.searchService.hideSearchResult();
    }

    openLoginModal() {
        this.closeSearchResult();
        const modal = this.simpleModalService.addModal(LoginComponent, {})
        .subscribe((isConfirmed) => {
            if (isConfirmed) {
            } else {
            }
        });
    }

}
