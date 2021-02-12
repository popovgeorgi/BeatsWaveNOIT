import { Component, Input, OnInit } from '@angular/core';

import { MenuConfigService } from '../../../../core/services/menu-config.service';
import { SearchService } from '../../../../core/services/search.service';
import { LoginComponent } from '../login/login.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { User } from 'src/app/core/models/User';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ['.mr15 { margin-right: 15px }']
})
export class ProfileComponent implements OnInit {

  @Input() user: User;

  isLogout: boolean = false;
  userMenu: any = [];
  userRole: string;

  constructor(private searchService: SearchService,
    private menuConfigService: MenuConfigService,
    private simpleModalService: SimpleModalService,
    private authService: AuthService,
    private snotifyService: SnotifyService,
    private router: Router) {
    this.userMenu = this.menuConfigService.userMenuItems;
  }

  ngOnInit() {
    if (this.authService.user.value) {
      this.userRole = this.authService.user.value.role;

      if (this.userRole == 'Beatmaker' || this.userRole == 'Administrator') {
        this.userMenu = this.menuConfigService.beatmakerUserMenuItems;
      }
      else if (this.userRole == 'Manager') {
        this.userMenu = this.menuConfigService.managerUserMenuItems;
      }
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
    this.isLogout = true;
    this.router.navigate(['/']);
    this.snotifyService.info('You successfully logged out!', '', {
      showProgressBar: false
    });
  }
}
