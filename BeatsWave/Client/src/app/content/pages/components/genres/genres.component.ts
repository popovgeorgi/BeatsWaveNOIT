import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { GenresConfigService } from '../../../../core/services/genres-config.service';
import { SongsConfigService } from '../../../../core/services/songs-config.service';

@Component({
    selector: 'app-genres',
    templateUrl: './genres.component.html'
})
export class GenresComponent implements OnInit, AfterViewInit {

    genres: any = [];

    constructor(private loadingService: LoadingService,
                private songsConfigService: SongsConfigService,
                private genresConfigService: GenresConfigService) { }

    ngOnInit() {
        this.initGenres();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize music genres
    initGenres() {
        this.genres = this.genresConfigService.genresList;
    }

}
