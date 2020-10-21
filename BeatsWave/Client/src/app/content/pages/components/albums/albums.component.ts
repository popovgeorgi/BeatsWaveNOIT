import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { AlbumsConfigService } from '../../../../core/services/albums-config.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html'
})
export class AlbumsComponent implements OnInit, AfterViewInit {

    albums: any = {};

    constructor(private spinner: NgxSpinnerService,
                private albumsConfigService: AlbumsConfigService) { }

    ngOnInit() {
        this.initAlbums();
    }

    ngAfterViewInit() {
        this.spinner.hide('primary');
    }

    // Initialize albums
    initAlbums() {
        this.albums.list = this.albumsConfigService.albumsList;
        this.albums.record = 5124;
    }

}
