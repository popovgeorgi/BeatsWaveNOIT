import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../core/services/loading.service';
import { SongsConfigService } from '../../../../../core/services/songs-config.service';
import { Config } from '../../../../../config/config';
import { AudioPlayerService } from '../../../../../core/services/audio-player.service';

@Component({
    selector: 'app-song-details',
    templateUrl: './song-details.component.html'
})
export class SongDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    songId: number;
    songDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private songsConfigService: SongsConfigService,
                private audioPlayerService: AudioPlayerService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.id) {
                this.songId = parseInt(param.id, 10);
                this.getSongDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getSongDetails() {
        this.songDetails = this.songsConfigService.getSongByIb(this.songId);
        this.setRatingsView();
    }

    // Set an array for ratings stars.
    setRatingsView() {
        this.songDetails.ratingsView = [];
        const ratings = Math.trunc(this.songDetails.ratings);
        for (let i = 0; i < ratings; i++) {
            this.songDetails.ratingsView.push(Config.STAR);
        }

        // Push half star in array
        if (this.songDetails.ratings % 1) {
            this.songDetails.ratingsView.push(Config.HALF_STAR);
        }
    }

    addInPlayer() {
        this.audioPlayerService.playSong(this.songDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
