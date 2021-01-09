import { Component, Input, OnInit } from '@angular/core';

import { MenuConfigService } from '../../../../core/services/menu-config.service';
import { SearchService } from '../../../../core/services/search.service';
import { LoginComponent } from '../login/login.component';
import {SimpleModalService} from 'ngx-simple-modal';
import { User } from 'src/app/core/models/User';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnotifyService } from 'ng-snotify';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: ['.mr15 { margin-right: 15px }']
})
export class ProfileComponent implements OnInit {

    @Input() user: User;

    userMenu: any = [];
    userRole: string;

    constructor(private searchService: SearchService,
                private menuConfigService: MenuConfigService,
                private simpleModalService: SimpleModalService,
                private authService: AuthService,
                private snotifyService: SnotifyService,
                private cartService: CartService) {
        this.userMenu = this.menuConfigService.userMenuItems;
    }

    ngOnInit() {
      this.userRole = this.authService.user.value.role;

      if (this.userRole == 'Beatmaker') {
        this.userMenu = this.menuConfigService.beatmakerUserMenuItems;
      }
    }

    public closeSearchResult() {
        this.searchService.hideSearchResult();
    }

    public openLoginModal() {
        this.closeSearchResult();
        const modal = this.simpleModalService.addModal(LoginComponent, {})
        .subscribe((isConfirmed) => {
            if (isConfirmed) {
            } else {
            }
        });
    }

    public openRegisterModal() {
        this.closeSearchResult();
        const modal = this.simpleModalService.addModal(RegisterComponent, {})
        .subscribe((isConfirmed) => {
            if (isConfirmed) {
            } else {
            }
        });
    }

    public Logout() {
        this.authService.logout();
        this.cartService.clear();
        this.snotifyService.success('You successfully logged out!');
    }
}
