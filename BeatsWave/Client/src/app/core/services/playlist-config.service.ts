import { EventEmitter, Injectable, Output, Directive } from '@angular/core';

import { PlaylistConfig } from '../../config/playlist';

@Directive()
@Injectable({
    providedIn: 'root'
})
export class PlaylistConfigService {

    @Output() songsQueue = new EventEmitter<any>();

    public playlistConfig: PlaylistConfig = new PlaylistConfig();

    constructor() { }

    get playlist() {
        return this.playlistConfig.config.items;
    }

    set currentPlaylist(playlist) {
        this.songsQueue.emit(playlist);
    }

    get currentPlaylist() {
        return this.songsQueue;
    }
}
