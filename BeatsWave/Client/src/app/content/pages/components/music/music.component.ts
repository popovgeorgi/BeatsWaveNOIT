import { Component, OnDestroy, OnInit } from '@angular/core';

import { BeatService } from 'src/app/core/services/beat.service';
import { Beat } from 'src/app/core/models/Beat';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeedHubService } from 'src/app/core/services/feed-hub.service';
import { SnotifyPosition, SnotifyService, SnotifyStyle, ToastDefaults } from 'ng-snotify';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html'
})
export class MusicComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  public beats: Beat[];
  public hasMoreBeatsToInclude: boolean = true;
  public beatsCount: number;
  public gridView = false;
  private itemsPerPage: number = 20;
  private page = 1;
  private userFavourites: Array<number>;


  constructor(private spinner: NgxSpinnerService,
    private beatService: BeatService,
    private feedHubService: FeedHubService,
    private snotifyService: SnotifyService,
    private userSerivce: UserService,
    private authService: AuthService,
    private router: Router) {
    this.snotifyService.config = ToastDefaults;
  }

  ngOnInit() {
    this.userSubscription = this.authService.user
      .subscribe(user => {
        if (user) {
          forkJoin([this.fetchInitialBeats(), this.fetchUserFavourites(), this.fetchBeatsTotalCount()]).subscribe(results => {
            this.userFavourites = results[1];
            this.setFeedLikes(results[0], this.userFavourites);

            if (results[0].length < this.itemsPerPage) {
              this.hasMoreBeatsToInclude = false;
            }
            this.beats = results[0];
            this.beatsCount = results[2];
          }, () => { }, () => {
            this.spinner.hide('routing');
          })
        }
        else {
          forkJoin([this.fetchInitialBeats(), this.fetchBeatsTotalCount()]).subscribe(results => {
            let beats = results[0];
            if (beats.length < this.itemsPerPage) {
              this.hasMoreBeatsToInclude = false;
            }
            this.beats = beats;
            this.beatsCount = beats.length;
            this.beatsCount = results[1];
          }, () => { }, () => {
            this.spinner.hide('routing');
          });
        }
      })

    this.feedHubService.startConnection();
    this.feedHubService.resultReceived.subscribe(id => {
      this.snotifyService.confirm('Do you want to check it out?', 'New Content', {
        position: SnotifyPosition.centerTop,
        type: SnotifyStyle.info,
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
          {
            text: 'Yes', action: (toast) => {
              this.router.navigate(['/song/' + id + '/details'])
              this.snotifyService.remove(toast.id);
            },
            bold: false
          },
          { text: 'No', action: (toast) => { this.snotifyService.remove(toast.id); } },
          { text: 'Later', action: (toast) => { this.snotifyService.remove(toast.id); } },
        ]
      });
    })
  }

  public showMore() {
    this.page++;
    this.beatService.getBeats(this.itemsPerPage, (this.page - 1) * this.itemsPerPage)
      .pipe(tap((res) => {
        if (this.userFavourites) {
          this.setFeedLikes(res, this.userFavourites);
        }
      }))
      .subscribe(beats => {
        if (beats.length < this.itemsPerPage) {
          this.hasMoreBeatsToInclude = false;
        }
        this.beats = this.beats.concat(beats);
      })
  }

  public onSelect(event) {
    let option = event.target.value;
    if (option == 0) {
      this.beats = this.beats.sort((a, b) => {
        return <any>new Date(b.createdOn) - <any>new Date(a.createdOn);
      });
    }
    else if (option == 1) {
      this.beats = this.beats.sort((a, b) => b.likesCount - a.likesCount);
    }
  }

  private fetchInitialBeats(): Observable<Array<Beat>> {
    return this.beatService.getBeats(this.itemsPerPage, (this.page - 1) * this.itemsPerPage);
  }

  private fetchUserFavourites(): Observable<Array<number>> {
    return this.userSerivce.getFavouritesByIds();
  }

  private fetchBeatsTotalCount(): Observable<number> {
    return this.beatService.getTotalCount();
  }

  private setFeedLikes(beats: Beat[], userFavourites: Array<number>) {
    let map = new Map<string, Array<number>>();
    map.set('favourites', userFavourites);
    beats.forEach(beat => {
      if (map.get('favourites').includes(beat.id)) {
        beat.isLiked = true;
      }
      else {
        beat.isLiked = false;
      }
    })
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    this.feedHubService.stopConnection();
  }
}
