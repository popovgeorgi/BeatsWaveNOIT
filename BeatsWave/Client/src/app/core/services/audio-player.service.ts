import { Injectable } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Beat } from '../models/Beat';
import { BeatService } from './beat.service';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  public songPlayed = new BehaviorSubject<boolean>(false);

  constructor(private beatService: BeatService) { }

  playSong(song: Beat) {
    this.beatService.addPlay(song.id)
      .pipe(
        catchError(err => {
          debugger;
          console.log(err);
          if (err.error) {
            console.log(console.log(err.error))
          }
          return of([]);
        })
      )
      .subscribe();
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
}
