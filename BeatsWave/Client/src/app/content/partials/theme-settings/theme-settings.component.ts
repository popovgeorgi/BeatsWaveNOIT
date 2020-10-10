import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { LocalStorageService } from '../../../core/services/local-storage.service';
import { SkinService } from '../../../core/services/skin.service';
import { Config } from '../../../config/config';

@Component({
    selector: 'app-theme-settings',
    templateUrl: './theme-settings.component.html'
})
export class ThemeSettingsComponent implements OnInit {

    @ViewChild('settingsWrapper', {static: false}) settingsWrapper: ElementRef;

    public config: Config = new Config();
    public themeClass = Config.THEME_CLASSES;

    themeSkin: any;
    settingOpen = 'open-settings';

    constructor(private localStorageService: LocalStorageService,
                private skinService: SkinService) {
        this.themeSkin = this.localStorageService.getThemeSkin();
        if (!this.themeSkin) {
            this.themeSkin = this.config.config.themeSkin;
        } else {
            this.config.config.themeSkin = this.themeSkin;
        }
    }

    ngOnInit() {
    }

    openSettings() {
        if (this.settingsWrapper.nativeElement.classList.contains(this.settingOpen)) {
            this.settingsWrapper.nativeElement.classList.remove(this.settingOpen);
        } else {
            this.settingsWrapper.nativeElement.classList.add(this.settingOpen);
        }
    }

    closeSettings() {
        this.settingsWrapper.nativeElement.classList.remove(this.settingOpen);
    }

    setThemeSkin(event) {
        if (event.target.checked) {
            this.themeSkin.theme = 'dark';
        } else if (!event.target.checked) {
          this.themeSkin.theme = 'light';
        }
        this.skinService.skin = this.themeSkin;
    }

    setHeaderSkin(index) {
        this.themeSkin.header = index;
        this.skinService.skin = this.themeSkin;
    }

    setSidebarSkin(index) {
        this.themeSkin.sidebar = index;
        this.skinService.skin = this.themeSkin;
    }

    setPlayerSkin(index) {
        this.themeSkin.player = index;
        this.skinService.skin = this.themeSkin;
    }

}
