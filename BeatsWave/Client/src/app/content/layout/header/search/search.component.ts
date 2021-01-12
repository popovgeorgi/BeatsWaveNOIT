import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SongsConfigService } from '../../../../core/services/songs-config.service';
import { AlbumsConfigService } from '../../../../core/services/albums-config.service';
import { ArtistsConfigService } from '../../../../core/services/artists-config.service';
import { SearchService } from '../../../../core/services/search.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    songsList: any = [];
    artistsList: any = [];

    constructor(private router: Router,
                private songsConfigService: SongsConfigService,
                private artistsConfigService: ArtistsConfigService,
                private searchService: SearchService) { }

    ngOnInit() {
        this.songsList = this.songsConfigService.songsList;
        this.songsList = this.songsList.slice(0, 3);

        this.artistsList = this.artistsConfigService.artistsList;
        this.artistsList = this.artistsList.slice(0, 6);
    }

    goToPage(page) {
        page = '/' + page;
        this.searchService.hideSearchResult();
        this.router.navigate([page]);
    }

}
