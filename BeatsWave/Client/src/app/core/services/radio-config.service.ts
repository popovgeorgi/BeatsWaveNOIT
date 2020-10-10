import { Injectable } from '@angular/core';
import {RadioConfig} from '../../config/radio';

@Injectable({
    providedIn: 'root'
})
export class RadioConfigService {

    public radioConfig: RadioConfig = new RadioConfig();

    constructor() { }

    get radioList() {
        return this.radioConfig.config.items;
    }
}
