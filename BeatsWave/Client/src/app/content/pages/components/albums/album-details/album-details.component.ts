import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../core/services/loading.service';
import { AlbumsConfigService } from '../../../../../core/services/albums-config.service';
import { SongsConfigService } from '../../../../../core/services/songs-config.service';
import { AudioPlayerService } from '../../../../../core/services/audio-player.service';
import { Config } from '../../../../../config/config';

@Component({
    selector: 'app-album-details',
    templateUrl: './album-details.component.html'
})
export class AlbumDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    albumId: number;
    albumDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private albumsConfigService: AlbumsConfigService,
                private songsConfigService: SongsConfigService,
                private audioPlayerService: AudioPlayerService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.id) {
                this.albumId = parseInt(param.id, 10);
                this.getAlbumDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize static data for display
    getAlbumDetails() {
        this.albumDetails = this.albumsConfigService.getAlbumByIb(this.albumId);
        this.albumDetails.songs = this.songsConfigService.songsList;
        this.setRatingsView();
    }

    // Set an array for ratings stars.
    setRatingsView() {
        this.albumDetails.ratingsView = [];
        const ratings = Math.trunc(this.albumDetails.ratings);
        for (let i = 0; i < ratings; i++) {
            this.albumDetails.ratingsView.push(Config.STAR);
        }

        // Push half star in array
        if (this.albumDetails.ratings % 1) {
            this.albumDetails.ratingsView.push(Config.HALF_STAR);
        }
    }

    playAllSongs() {
        this.audioPlayerService.playNowPlaylist(this.albumDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
