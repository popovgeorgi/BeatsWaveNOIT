import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { SongsConfigService } from '../../../../core/services/songs-config.service';
import { Beat } from 'src/app/core/models/Beat';
import { BeatService } from 'src/app/core/services/beat.service';

@Component({
    selector: 'app-songs',
    templateUrl: './songs.component.html'
})
export class SongsComponent implements OnInit, AfterViewInit {

    public beats: Beat[];
    public beatsCount: number;
    public gridView = false;
    private takeBeatsCount: number = 8;

    constructor(private loadingService: LoadingService,
                private beatService: BeatService) { }

    ngOnInit() {
        this.fetchBeats();
    }

    private fetchBeats() {
        this.beatService.getBeats(this.takeBeatsCount).subscribe(beats => {
            this.beats = beats;
            this.beatsCount = beats.length;
        })
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }
}
