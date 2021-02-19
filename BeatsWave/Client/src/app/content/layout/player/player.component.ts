import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Config } from '../../../config/config';
import * as Amplitude from 'amplitudejs';
import { AudioPlayerService } from 'src/app/core/services/audio-player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {

  audioSubscription: Subscription;
  initialSong: any;
  song: any;
  imageUrl: string;
  volumeIcon = 'ion-md-volume-low';
  showPlaylist = 'open-right-sidebar';
  playerClass = 'player-primary';

  constructor(@Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService,
    private audioPlayerService: AudioPlayerService) { }

  ngOnInit() {
    this.audioSubscription = this.audioPlayerService.songPlayed.subscribe(beat => {
      this.song = beat;
    })

    this.song = {
      name: 'Start listening',
      producerUserName: 'Just click on a beat',
      imageUrl: 'https://beatswave.blob.core.windows.net/photos/note.jpg'
    }
    Amplitude.init({
      songs: [this.song]
    });

    const themeSkin = this.localStorageService.getThemeSkin();
    if (themeSkin) {
      this.playerClass = 'player-' + Config.THEME_CLASSES[themeSkin.player];
    }
  }

  changeVolumeIcon(event) {
    const value = event.target.value;
    if (value < 1) {
      this.volumeIcon = 'ion-md-volume-mute';
    } else if (value > 0 && value < 70) {
      this.volumeIcon = 'ion-md-volume-low';
    } else if (value > 70) {
      this.volumeIcon = 'ion-md-volume-high';
    }
  }

  openPlaylist() {
    if (this.document.body.classList.contains(this.showPlaylist)) {
      this.document.body.classList.remove(this.showPlaylist);
    } else {
      this.document.body.classList.add(this.showPlaylist);
    }
  }
}
