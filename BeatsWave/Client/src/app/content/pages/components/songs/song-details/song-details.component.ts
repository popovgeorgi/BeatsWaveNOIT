import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AudioPlayerService } from "../../../../../core/services/audio-player.service";
import { BeatService } from "src/app/core/services/beat.service";
import { first, map, mergeMap, tap } from "rxjs/operators";
import { Beat } from "src/app/core/models/Beat";
import { NgxSpinnerService } from 'ngx-spinner';
import { LikeService } from 'src/app/core/services/like.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AuthService } from "src/app/core/services/auth.service";
import { SimpleModalService } from "ngx-simple-modal";
import { SongEditComponent } from "../song-edit/song-edit.component";
import { SongBuyComponent } from "../song-buy/song-buy.component";
import { GoogleAnalyticsService } from "src/app/core/services/google-analytics.service";

@Component({
  selector: "app-song-details",
  templateUrl: "./song-details.component.html",
})
export class SongDetailsComponent implements OnInit, OnDestroy {

  private user;
  private userSubscription: Subscription;
  public isLiked: boolean;
  public beatDetails: Beat;
  public isUserOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private audioPlayerService: AudioPlayerService,
    private beatService: BeatService,
    private likeService: LikeService,
    private snotifyService: SnotifyService,
    private authService: AuthService,
    private simpleModalService: SimpleModalService,
    public googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.snotifyService.config = ToastDefaults;
  }

  ngOnInit() {
    this.fetchData().pipe(
      tap(beat => {
        this.userSubscription = this.authService.user.subscribe(user => {
          this.user = user;
          if (user) {
            if (beat.producerId == user.id) {
              this.isUserOwner = true;
            }
          }
        })
      })
    ).subscribe(beat => {
      this.beatDetails = beat;
    }, () => { }, () => {
      this.spinner.hide('routing');
    })
  }

  private fetchData(): Observable<Beat> {
    return this.route.params
      .pipe(
        first(),
        map((params) => {
          const id = params["id"];
          return id;
        }),
        mergeMap((id) => this.beatService.getBeat(id)));
  }

  public contact() {
    this.googleAnalyticsService.eventEmitter("user_trying_to_contact_producer", "contact", "connect", "click", 1);
    if (!this.beatDetails.isProducerReceivingEmails) {
      this.snotifyService.info(`The producer of ${this.beatDetails.name} is currently not receiving emails. Find another way to contact him.`, '', {
        showProgressBar: false,
        timeout: 5000
      });
    }
    else if (this.user) {
      const modal = this.simpleModalService.addModal(SongBuyComponent, { data: this.beatDetails })
        .subscribe((isConfirmed) => {
          if (isConfirmed) {
          } else {
          }
        });
    }
    else {
      this.snotifyService.info("Sign up in order to contact the producer", '', {
        showProgressBar: false
      });
    }
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
    if (this.user) {
      this.likeService.vote(this.beatDetails.id).subscribe(res => {
        this.isLiked = res;
        if (this.isLiked == true) {
          this.snotifyService.info('Liked ' + this.beatDetails.name, '', {
            showProgressBar: false
          });
        }
        else if (this.isLiked == false) {
          this.snotifyService.info('Unliked ' + this.beatDetails.name, '', {
            showProgressBar: false
          });
        }
      })
    }
    else {
      this.snotifyService.warning("You must be logged in", '', {
        showProgressBar: false
      });
    }
  }

  public onBeatmakerClicked(id: string) {
    this.router.navigate(['artist/' + id + '/details']);
  }

  addInPlayer() {
    this.audioPlayerService.playSong(this.beatDetails);

    let userId = this.authService.getUserId();
    if (userId != null && userId != this.beatDetails.producerId) {
      this.beatService.addPlay(this.beatDetails.id).subscribe();
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
