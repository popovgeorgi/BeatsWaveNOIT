import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AudioPlayerService } from "../../../../../core/services/audio-player.service";
import { BeatService } from "src/app/core/services/beat.service";
import { map, mergeMap, tap } from "rxjs/operators";
import { Beat } from "src/app/core/models/Beat";
import { NgxSpinnerService } from 'ngx-spinner';
import { LikeService } from 'src/app/core/services/like.service';
import { SnotifyService } from 'ng-snotify';
import { LoadingService } from 'src/app/core/services/loading.service';
import { CartService } from "src/app/core/services/cart.service";
import { AuthService } from "src/app/core/services/auth.service";
import { SimpleModalService } from "ngx-simple-modal";
import { SongEditComponent } from "../song-edit/song-edit.component";

@Component({
  selector: "app-song-details",
  templateUrl: "./song-details.component.html",
})
export class SongDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  private userSubscription: Subscription;
  public isLiked: boolean;
  public beatDetails: Beat;
  public isUserOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private loadingService: LoadingService,
    private audioPlayerService: AudioPlayerService,
    private beatService: BeatService,
    private likeService: LikeService,
    private snotifyService: SnotifyService,
    private cartService: CartService,
    private authService: AuthService,
    private simpleModalService: SimpleModalService
  ) { }

  ngOnInit() {
    this.fetchData().pipe(
      tap(beat => {
        this.userSubscription = this.authService.user.subscribe(user => {
          if (user) {
            if (beat.producerId == user.id) {
              this.isUserOwner = true;
            }
          }
        })
      })
    ).subscribe(beat => {
      this.beatDetails = beat;
    })
  }

  private fetchData(): Observable<Beat> {
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

  public edit() {
    const modal = this.simpleModalService.addModal(SongEditComponent, { data: this.beatDetails })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
        } else {
        }
      });
  }

  public delete() {
    this.snotifyService.confirm('Are you sure you want to delete ' + this.beatDetails.name + '?', 'Delete', {
      timeout: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Yes', action: (toast) => {
            this.beatService.deleteBeat(this.beatDetails.id).subscribe(() => {
              this.snotifyService.remove(toast.id);
              this.snotifyService.success('Successfully deleted ' + this.beatDetails.name);
              this.router.navigate(['/my-beats']);
            });
          }
        },
        {
          text: 'No', action: (toast) => { this.snotifyService.remove(toast.id); }
        }
      ]
    });
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

  ngAfterViewInit() {
    this.loadingService.stopLoading();
    this.spinner.hide('routing');
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  addInPlayer() {
    this.audioPlayerService.playSong(this.beatDetails);
  }
}
