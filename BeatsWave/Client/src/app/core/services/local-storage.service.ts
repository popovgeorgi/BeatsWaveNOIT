import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Config} from '../../config/config';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    setLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to local storage', e);
            return null;
        }
    }

    getLocalStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Error getting data from local storage', e);
            return null;
        }
    }

    getCurrentUser() {
        return this.getLocalStorage(Config.CURRENT_USER);
    }

    getThemeSkin() {
        return this.getLocalStorage(Config.THEME_SKIN);
    }
}
