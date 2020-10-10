import { EventEmitter, Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { Config } from '../../config/config';

@Injectable({
    providedIn: 'root'
})
export class SkinService {

    themeSkin: EventEmitter<any> = new EventEmitter();

    constructor(private localStorageService: LocalStorageService) { }

    get skin() {
        return this.themeSkin;
    }

    set skin(value) {
        this.themeSkin.emit(value);
        this.localStorageService.setLocalStorage(Config.THEME_SKIN, value);
    }
}
