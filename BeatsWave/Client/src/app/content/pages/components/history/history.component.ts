import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { SongsConfigService } from '../../../../core/services/songs-config.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit, AfterViewInit {

    songs: any = {};

    constructor(private loadingService: LoadingService,
                private songsConfigService: SongsConfigService) { }

    ngOnInit() {
        this.initSongs();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize song object for section
    initSongs() {
        this.songs = {
            title: 'History',
            subTitle: 'You recently listen',
            list: this.songsConfigService.songsList
        };
    }

}
