import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuConfigService } from '../../../../core/services/menu-config.service';
import { SkinService } from '../../../../core/services/skin.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { Config } from '../../../../config/config';
import { DOCUMENT } from '@angular/common';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html'
})
export class AsideLeftComponent implements OnInit, OnDestroy {

  menuItems: any = [];
  asideFooterButton: any = {};
  sidebarClass = 'sidebar-primary';
  userRole: string;

  skinSubscription: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document,
    public menuConfigService: MenuConfigService,
    private localStorageService: LocalStorageService,
    private skinService: SkinService,
    private authService: AuthService) {
    this.menuItems = this.menuConfigService.menuItems;

    this.asideFooterButton = {
      icon: 'ion-md-musical-note',
      title: 'Add Music'
    };
  }

  ngOnInit() {
    const themeSkin = this.localStorageService.getThemeSkin();
    if (themeSkin) {
      this.sidebarClass = 'sidebar-' + Config.THEME_CLASSES[themeSkin.sidebar];
    }

    this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
      if (skin) {
        this.sidebarClass = 'sidebar-' + Config.THEME_CLASSES[skin.sidebar];
      }
    });
    if (this.authService.user != null) {
      this.userRole = this.authService.user.value.role;

      if (this.userRole == 'Admin') {
        this.menuItems = this.menuConfigService.adminMenuItems;
      }
      if (this.userRole == 'Beatmaker' || this.userRole == 'Artist') {
        this.menuItems = this.menuConfigService.beatmakerMenuItems;
      }
      else if (this.userRole == 'Manager') {
        this.menuItems = this.menuConfigService.managerMenuItems;
      }
      if (this.userRole == 'Manager' || this.userRole == 'Artist') {
        this.asideFooterButton = {
          icon: 'ion-md-musical-note',
          title: 'Start uploading'
        };
      }
    }
  }

  hideSidebar() {
    this.document.body.classList.remove(Config.classes.openSidebar);
  }

  ngOnDestroy() {
    this.skinSubscription.unsubscribe();
  }

}
