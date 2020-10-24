import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { LoadingService } from "../../../../../core/services/loading.service";
import { SongsConfigService } from "../../../../../core/services/songs-config.service";
import { Config } from "../../../../../config/config";
import { AudioPlayerService } from "../../../../../core/services/audio-player.service";
import { BeatService } from "src/app/core/services/beat.service";
import { map, mergeMap } from "rxjs/operators";
import { Beat } from "src/app/core/models/Beat";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-song-details",
  templateUrl: "./song-details.component.html",
})
export class SongDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  songId: number;
  beatDetails: Beat;

  routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private songsConfigService: SongsConfigService,
    private audioPlayerService: AudioPlayerService,
    private beatService: BeatService
  ) {
    this.fetchData();
  }

  ngOnInit() { }

  private fetchData() {
    this.route.params
      .pipe(map((params) => {
        const id = params["id"];
        return id;
      }), mergeMap((id) => this.beatService.getBeat(id))).subscribe((beat) => {
        this.beatDetails = beat;
      });
  }

  ngAfterViewInit() {
    this.spinner.hide('primary');
  }

  // getSongDetails() {
  //     this.songDetails = this.songsConfigService.getSongByIb(this.songId);
  //     this.setRatingsView();
  // }

  // Set an array for ratings stars.
  // setRatingsView() {
  //     this.songDetails.ratingsView = [];
  //     const ratings = Math.trunc(this.songDetails.ratings);
  //     for (let i = 0; i < ratings; i++) {
  //         this.songDetails.ratingsView.push(Config.STAR);
  //     }

  //     // Push half star in array
  //     if (this.songDetails.ratings % 1) {
  //         this.songDetails.ratingsView.push(Config.HALF_STAR);
  //     }
  // }

  addInPlayer() {
    this.audioPlayerService.playSong(this.beatDetails);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
