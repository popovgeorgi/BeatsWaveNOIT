import { Injectable } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { EventEmitter } from 'protractor';
import { BehaviorSubject } from 'rxjs';
import { Beat } from '../models/Beat';
import { SongsConfigService } from './songs-config.service';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {

    private beat: Beat = {} as Beat;
    private songPlayedSource = new BehaviorSubject<Beat>(this.beat);
    public songPlayed = this.songPlayedSource.asObservable();

    constructor(private songsConfigService: SongsConfigService) { }

    playSong(song: Beat) {
      debugger;
        Amplitude.removeSong(0);
        Amplitude.playNow(song);
        this.songPlayedSource.next(song);
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
