import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SongsConfigService } from '../../../../core/services/songs-config.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { BeatService } from 'src/app/core/services/beat.service';
import { Beat } from 'src/app/core/models/Beat';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html'
})
export class MusicComponent implements OnInit, AfterViewInit {

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
