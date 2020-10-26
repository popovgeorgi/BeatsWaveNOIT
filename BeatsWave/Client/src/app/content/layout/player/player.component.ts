import { Component, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { SongsConfigService } from '../../../core/services/songs-config.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { SkinService } from '../../../core/services/skin.service';
import { Config } from '../../../config/config';
import * as Amplitude from 'amplitudejs';
import { Beat } from 'src/app/core/models/Beat';
import { AudioPlayerService } from 'src/app/core/services/audio-player.service';
import { EventEmitter } from 'protractor';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnDestroy {

    song: Beat;
    volumeIcon = 'ion-md-volume-low';
    showPlaylist = 'open-right-sidebar';
    playerClass = 'player-primary';

    skinSubscription: Subscription;
    private songSubscribtion: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document,
                private localStorageService: LocalStorageService,
                private songsConfigService: SongsConfigService,
                private skinService: SkinService,
                private audioPlayerService: AudioPlayerService) { }

    ngOnInit() {
        this.song = this.songsConfigService.defaultSong;

        Amplitude.init({
          songs: [ this.song ],
          debug: true
        });

        const themeSkin = this.localStorageService.getThemeSkin();
        if (themeSkin) {
            this.playerClass = 'player-' + Config.THEME_CLASSES[themeSkin.player];
        }

        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if (skin) {
                this.playerClass = 'player-' + Config.THEME_CLASSES[skin.player];
            }
        });
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

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
        this.songSubscribtion.unsubscribe();
    }

}
