import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../core/services/loading.service';
import { ArtistsConfigService } from '../../../../../core/services/artists-config.service';
import { SongsConfigService } from '../../../../../core/services/songs-config.service';
import { AudioPlayerService } from '../../../../../core/services/audio-player.service';
import { Config } from '../../../../../config/config';

@Component({
    selector: 'app-artist-details',
    templateUrl: './artist-details.component.html'
})
export class ArtistDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    artistId: number;
    artistDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private artistsConfigService: ArtistsConfigService,
                private songsConfigService: SongsConfigService,
                private audioPlayerService: AudioPlayerService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.id) {
                this.artistId = parseInt(param.id, 10);
                this.getArtistDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getArtistDetails() {
        this.artistDetails = this.artistsConfigService.getArtistByIb(this.artistId);
        this.artistDetails.songs = this.songsConfigService.songsList;
        this.artistDetails.record = 124;
        this.setRatingsView();
    }

    // Set an array for ratings stars.
    setRatingsView() {
        this.artistDetails.ratingsView = [];
        const ratings = Math.trunc(this.artistDetails.ratings);
        for (let i = 0; i < ratings; i++) {
            this.artistDetails.ratingsView.push(Config.STAR);
        }

        // Push half star in array
        if (this.artistDetails.ratings % 1) {
            this.artistDetails.ratingsView.push(Config.HALF_STAR);
        }
    }

    playAllSongs() {
        this.audioPlayerService.playNowPlaylist(this.artistDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
