import { Injectable } from '@angular/core';

import { MenuConfig } from '../../config/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuConfigService {

  public menuConfig: MenuConfig = new MenuConfig();

  constructor() { }

  get menuItems() {
    return this.menuConfig.config.aside.items;
  }

  get userMenuItems() {
    return this.menuConfig.config.userMenu.items;
  }

  get artistMenuItems() {
    return this.menuConfig.config.aside.artistItems;
  }

  get guestMenuItems() {
    return this.menuConfig.config.aside.guestItems;
  }

  get beatmakerMenuItems() {
    return this.menuConfig.config.aside.beatmakerItems;
  }

  get managerMenuItems() {
    return this.menuConfig.config.aside.managerItems;
  }

  get adminMenuItems() {
    return this.menuConfig.config.aside.items;
  }

  get beatmakerUserMenuItems() {
    return this.menuConfig.config.beatmakerUserMenu.items;
  }
}
