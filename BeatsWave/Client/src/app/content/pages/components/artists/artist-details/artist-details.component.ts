import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LoadingService } from '../../../../../core/services/loading.service';
import { ArtistsConfigService } from '../../../../../core/services/artists-config.service';
import { SongsConfigService } from '../../../../../core/services/songs-config.service';
import { AudioPlayerService } from '../../../../../core/services/audio-player.service';
import { Config } from '../../../../../config/config';
import { ArtistService } from 'src/app/core/services/artist.service';
import { Artist } from 'src/app/core/models/Artist';

@Component({
    selector: 'app-artist-details',
    templateUrl: './artist-details.component.html'
})
export class ArtistDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    artistId: number;
    artistDetails: Artist;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
        private loadingService: LoadingService,
        private artistsConfigService: ArtistsConfigService,
        private songsConfigService: SongsConfigService,
        private audioPlayerService: AudioPlayerService,
        private artistService: ArtistService) {
        this.fetchData();
    }

    fetchData() {
        this.route.params.pipe(map(params => {
            const id = params['id'];
            this.artistId = id
            return id;
        }), mergeMap(id => this.artistService.getArtist(id))).subscribe(res => {
            this.artistDetails = res;
        })
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
}
