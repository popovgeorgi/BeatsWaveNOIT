import { Injectable, OnDestroy } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { Subject, Subscription } from 'rxjs';
import { Beat } from '../models/Beat';
import { AuthService } from './auth.service';
import { BeatService } from './beat.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  userSubscription: Subscription;
  public songPlayed = new Subject<Beat>();

  constructor(private beatService: BeatService,
    private localStorageService: LocalStorageService) { }

  playSong(song: Beat) {
    let token = this.localStorageService.getLocalStorage('token');
    if (token) {
      this.beatService.addPlay(song.id).subscribe();
    }
    this.songPlayed.next(song);
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
      Amplitude.addPlaylist(listName, { name: listName }, playlist.songs);
    }
    Amplitude.playPlaylistSongAtIndex(songIndex, listName);
    const song = playlist.songs[songIndex];
    Amplitude.playNow(song);
  }
}
