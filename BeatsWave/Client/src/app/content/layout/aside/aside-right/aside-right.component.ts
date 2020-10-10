import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';

import { PlaylistConfigService } from '../../../../core/services/playlist-config.service';
import { SongsConfigService } from '../../../../core/services/songs-config.service';

@Component({
    selector: 'app-aside-right',
    templateUrl: './aside-right.component.html'
})
export class AsideRightComponent implements OnInit, OnDestroy {

    @HostBinding('id') id = 'rightSidebar';

    playlist: any = {};
    private playlistSubscription;

    constructor(private playlistConfigService: PlaylistConfigService,
                private songsConfigService: SongsConfigService) { }

    ngOnInit() {
        this.setDefaultPlaylist();
        this.playlistSubscription = this.playlistConfigService.currentPlaylist.subscribe((playlist) => {
            this.playlist = playlist;
        });
    }

    setDefaultPlaylist() {
        this.playlist = {
            id: 1,
            name: 'Listen Special',
            cover_url: './assets/images/background/horizontal/1.jpg',
            songs: this.songsConfigService.songsList
        };
    }

    ngOnDestroy() {
        this.playlistSubscription.unsubscribe();
    }

}
