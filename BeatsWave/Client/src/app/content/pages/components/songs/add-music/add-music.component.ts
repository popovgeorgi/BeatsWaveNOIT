import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../../core/services/loading.service';

@Component({
    selector: 'app-add-music',
    templateUrl: './add-music.component.html'
})
export class AddMusicComponent implements OnInit, AfterViewInit {

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
