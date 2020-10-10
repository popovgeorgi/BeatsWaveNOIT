import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { SongsConfigService } from '../../../../core/services/songs-config.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit, AfterViewInit {

    favoriteSongs: any = {};
    songs: any = {};
    gridView = false;

    constructor(private loadingService: LoadingService,
                private songsConfigService: SongsConfigService) { }

    ngOnInit() {
        this.initSongs();
        this.initFavoriteSongs();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize favorite songs
    initFavoriteSongs() {
        this.favoriteSongs.list = this.songsConfigService.songsList;
        this.favoriteSongs.record = 5124;
    }

    // Initialize song object for section
    initSongs() {
        this.songs = {
            title: 'Also Like',
            subTitle: 'Check it out these songs',
            page: '/songs',
            items: this.songsConfigService.songsList
        };
    }

}
