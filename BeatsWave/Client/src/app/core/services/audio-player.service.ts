import { Injectable } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { BehaviorSubject } from 'rxjs';
import { Beat } from '../models/Beat';
import { SongsConfigService } from './songs-config.service';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {

    constructor() { }

    playSong(song: Beat) {
        Amplitude.removeSong(0);
        Amplitude.playNow(song);
    }

    playlistKayName(playlistName) {
        return playlistName.toLowerCase().replace(' ', '_');
    }

    playNowPlaylist(playlist, songIndex = 0) {
        const listName = this.playlistKayName(playlist.name);
        Amplitude.removeSong(0);
        if (!Amplitude.getActivePlaylist()) {
            Amplitude.addPlaylist(listName, {name: listName}, playlist.songs);
        }
        Amplitude.playPlaylistSongAtIndex(songIndex, listName);
        const song = playlist.songs[songIndex];
        Amplitude.playNow(song);
    }
}
