import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { ArtistsConfigService } from '../../../../core/services/artists-config.service';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html'
})
export class ArtistsComponent implements OnInit, AfterViewInit {

    artists: any = {};

    constructor(private loadingService: LoadingService,
                private artistsConfigService: ArtistsConfigService) { }

    ngOnInit() {
        this.initArtists();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize songs
    initArtists() {
        this.artists.list = this.artistsConfigService.artistsList;
        this.artists.record = 5124;
    }

}
