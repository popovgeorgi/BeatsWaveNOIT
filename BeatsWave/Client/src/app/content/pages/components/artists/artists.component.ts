import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { Artist } from 'src/app/core/models/Artist';
import { ArtistService } from 'src/app/core/services/artist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html'
})
export class ArtistsComponent implements OnInit, AfterViewInit {
    artists: Array<Artist>;
    record: number;

    constructor(private spinner: NgxSpinnerService,
                private artistService: ArtistService) { }

    ngOnInit() {
        this.fetchArtists();
    }

    private fetchArtists() {
        this.artistService.getArtists().subscribe(artists => {
            console.log(artists);
            this.artists = artists;
            this.record = artists.length;
        })
    }

    ngAfterViewInit() {
        this.spinner.hide('primary');
    }
}
