import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SongsConfigService } from '../../../../core/services/songs-config.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { BeatService } from 'src/app/core/services/beat.service';
import { Beat } from 'src/app/core/models/Beat';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html'
})
export class MusicComponent implements OnInit, AfterViewInit {

    public selector: string = '#pageWrapper'
    public beats: Beat[];
    public beatsCount: number;
    public gridView = false;
    private takeBeatsCount: number = 20;

    constructor(private spinner: NgxSpinnerService,
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
        this.spinner.hide('primary');
    }

    public onScroll() {
      debugger;
      console.log('scrolling');
    }
}
