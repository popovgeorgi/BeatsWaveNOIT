import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SongsConfigService } from '../../../../core/services/songs-config.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { BeatService } from 'src/app/core/services/beat.service';
import { Beat } from 'src/app/core/models/Beat';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeedHubService } from 'src/app/core/services/feed-hub.service';
import { SnotifyPosition, SnotifyService, SnotifyStyle } from 'ng-snotify';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html'
})
export class MusicComponent implements OnInit, AfterViewInit {


    public beats: Beat[];
    public hasMoreBeatsToInclude: boolean = true;
    public beatsCount: number;
    public gridView = false;
    private itemsPerPage: number = 20;
    private page = 1;


    constructor(private spinner: NgxSpinnerService,
                private beatService: BeatService,
                private feedHubService: FeedHubService,
                private snotifyService: SnotifyService) { }

    ngOnInit() {
        this.fetchInitialBeats();
        this.feedHubService.startConnection();
        this.feedHubService.resultReceived.subscribe(id => {
          this.snotifyService.create({
            title: 'New Content',
            body: 'New beat available. Check it out!',
            config: {
              position: SnotifyPosition.centerBottom,
              type: SnotifyStyle.info
            }
          })
          console.log(id);
        })
    }

    private fetchInitialBeats() {
        this.beatService.getBeats(this.itemsPerPage, (this.page - 1) * this.itemsPerPage).subscribe(beats => {
            if(beats.length < this.itemsPerPage) {
              this.hasMoreBeatsToInclude = false;
            }

            this.beats = beats;
            this.beatsCount = beats.length;
        })
    }

    ngAfterViewInit() {
        this.spinner.hide('primary');
    }

    showMore() {
        this.page++;
        this.beatService.getBeats(this.itemsPerPage, (this.page - 1) * this.itemsPerPage).subscribe(beats => {
          if(beats.length < this.itemsPerPage) {
            this.hasMoreBeatsToInclude = false;
          }
          this.beats = this.beats.concat(beats);
        })
    }
}
