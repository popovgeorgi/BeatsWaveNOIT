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
}
