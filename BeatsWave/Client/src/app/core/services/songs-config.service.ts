import { Injectable } from '@angular/core';

import { SongsConfig } from '../../config/songs';

@Injectable({
    providedIn: 'root'
})
export class SongsConfigService {

    public songsConfig: SongsConfig = new SongsConfig();

    constructor() { }

    get songsList() {
        return this.songsConfig.config.items;
    }

    get defaultSong() {
        return this.songsConfig.config.items[0];
    }

    getSongByIb(id) {
        return this.songsList.find(song => song.id === id);
    }
}
