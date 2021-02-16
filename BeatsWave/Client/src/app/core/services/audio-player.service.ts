import { Injectable, OnDestroy } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Beat } from '../models/Beat';
import { AuthService } from './auth.service';
import { BeatService } from './beat.service';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService implements OnDestroy {

  userSubscription: Subscription;
  public songPlayed = new Subject<Beat>();

  constructor(private beatService: BeatService,
    private authService: AuthService) { }

  playSong(song: Beat) {
    this.songPlayed.next(song);
    Amplitude.removeSong(0);
    Amplitude.playNow(song);
    this.userSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.beatService.addPlay(song.id).subscribe(() => { }, err => {
          console.log(err.error);
        });
      }
    })
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

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
