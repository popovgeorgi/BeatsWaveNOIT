import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { SongsConfigService } from "../../../../../core/services/songs-config.service";
import { AudioPlayerService } from "../../../../../core/services/audio-player.service";
import { BeatService } from "src/app/core/services/beat.service";
import { map, mergeMap, tap } from "rxjs/operators";
import { Beat } from "src/app/core/models/Beat";
import { NgxSpinnerService } from 'ngx-spinner';
import { LikeService } from 'src/app/core/services/like.service';
import { SnotifyService } from 'ng-snotify';
import { LoadingService } from 'src/app/core/services/loading.service';
import { CartService } from "src/app/core/services/cart.service";

@Component({
  selector: "app-song-details",
  templateUrl: "./song-details.component.html",
})
export class SongDetailsComponent implements OnInit, AfterViewInit {
  public isLiked: boolean;
  public beatDetails: Beat;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private loadingService: LoadingService,
    private audioPlayerService: AudioPlayerService,
    private beatService: BeatService,
    private likeService: LikeService,
    private snotifyService: SnotifyService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.fetchData().subscribe(res => {
      this.beatDetails = res;
    })
  }

  public vote() {
    this.likeService.vote(this.beatDetails.id).subscribe(res => {
      this.isLiked = res;
      if (this.isLiked == true) {
        this.snotifyService.info('Liked' + ' ' + this.beatDetails.name);
      }
      else if (this.isLiked == false) {
        this.snotifyService.info('Unliked' + ' ' + this.beatDetails.name);
      }
    })
  }

  public addToCart(id: number) {
    this.cartService.add(id);
  }

  public onBeatmakerClicked(id: string) {
    this.router.navigate(['artist/' + id + '/details']);
  }
  //'artist/:id/details'

  private fetchData() {
    return this.route.params
      .pipe(map((params) => {
        const id = params["id"];
        return id;
      }),
        mergeMap((id) => this.beatService.getBeat(id)))
    // this.likeService.doesUserLike(this.beatId).subscribe(res => {
    //   this.isLiked = res;
    // });
  }

  ngAfterViewInit() {
    this.loadingService.stopLoading();
    this.spinner.hide('routing');
  }

  addInPlayer() {
    this.audioPlayerService.playSong(this.beatDetails);
  }
}
