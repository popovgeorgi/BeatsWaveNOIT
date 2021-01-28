import { Component, OnDestroy, OnInit } from '@angular/core';

import { BeatService } from 'src/app/core/services/beat.service';
import { Beat } from 'src/app/core/models/Beat';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeedHubService } from 'src/app/core/services/feed-hub.service';
import { SnotifyPosition, SnotifyService, SnotifyStyle } from 'ng-snotify';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

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


  constructor(private spinner: NgxSpinnerService,
    private beatService: BeatService,
    private feedHubService: FeedHubService,
    private snotifyService: SnotifyService,
    private userSerivce: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user
      .subscribe(user => {
        if (user) {
          forkJoin([this.fetchInitialBeats(), this.fetchUserFavourites()]).subscribe(results => {
            let map = new Map<string, Array<number>>();
            map.set('favourites', results[1]);
            results[0].forEach(beat => {
              if (map.get('favourites').includes(beat.id)) {
                beat.isLiked = true;
              }
              else {
                beat.isLiked = false;
              }
            })
            if (results[0].length < this.itemsPerPage) {
              this.hasMoreBeatsToInclude = false;
            }
            this.beats = results[0];
            this.beatsCount = results[0].length;
          }, () => { }, () => {
            this.spinner.hide('routing');
          })
        }
        else {
          this.fetchInitialBeats()
            .subscribe(beats => {
              if (beats.length < this.itemsPerPage) {
                this.hasMoreBeatsToInclude = false;
              }
              this.beats = beats;
              this.beatsCount = beats.length;
            }, () => { }, () => {
              this.spinner.hide('routing');
            });
        }
      })

    this.feedHubService.startConnection();
    this.feedHubService.resultReceived.subscribe(id => {
      this.snotifyService.create({
        title: 'New Content',
        body: 'New beat available. Check it out!',
        config: {
          position: SnotifyPosition.centerTop,
          type: SnotifyStyle.info
        }
      })
    })
  }

  showMore() {
    this.page++;
    this.beatService.getBeats(this.itemsPerPage, (this.page - 1) * this.itemsPerPage).subscribe(beats => {
      if (beats.length < this.itemsPerPage) {
        this.hasMoreBeatsToInclude = false;
      }
      this.beats = this.beats.concat(beats);
    })
  }

  private fetchInitialBeats(): Observable<Array<Beat>> {
    return this.beatService.getBeats(this.itemsPerPage, (this.page - 1) * this.itemsPerPage);
  }

  private fetchUserFavourites(): Observable<Array<number>> {
    return this.userSerivce.getFavouritesByIds();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
