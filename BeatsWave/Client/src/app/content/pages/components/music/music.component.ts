import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SongsConfigService } from '../../../../core/services/songs-config.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html'
})
export class MusicComponent implements OnInit, AfterViewInit {

    songs: any = {};
    gridView = false;

    constructor(private loadingService: LoadingService,
                private songsConfigService: SongsConfigService) { }

    ngOnInit() {
        this.initSongs();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize songs
    initSongs() {
        this.songs.list = this.songsConfigService.songsList;
        this.songs.record = 5124;
    }

}
