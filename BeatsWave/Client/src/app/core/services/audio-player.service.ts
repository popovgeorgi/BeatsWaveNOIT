import { Injectable, OnDestroy } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Beat } from '../models/Beat';
import { AuthService } from './auth.service';
import { BeatService } from './beat.service';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService implements OnDestroy {

  userSubscription: Subscription;
  public songPlayed = new BehaviorSubject<boolean>(false);

  constructor(private beatService: BeatService,
    private authService: AuthService) { }

  playSong(song: Beat) {
    this.userSubscription = this.authService.user.subscribe(user => {
      debugger;
      if (user) {
        this.beatService.addPlay(song.id).subscribe(() => { }, err => {
          console.log(err.error);
        });
      }
    })
    this.songPlayed.next(true);
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

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
