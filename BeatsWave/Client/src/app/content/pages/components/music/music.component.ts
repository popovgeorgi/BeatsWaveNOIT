import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SongsConfigService } from '../../../../core/services/songs-config.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { BeatService } from 'src/app/core/services/beat.service';
import { Beat } from 'src/app/core/models/Beat';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeedHubService } from 'src/app/core/services/feed-hub.service';
import { SnotifyPosition, SnotifyService, SnotifyStyle } from 'ng-snotify';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html'
})
export class MusicComponent implements OnInit, AfterViewInit {

  userSubscription: Subscription;
  public beats: Beat[];
  private userFavourites: Beat[];
  public hasMoreBeatsToInclude: boolean = true;
  public beatsCount: number;
  public gridView = false;
  private itemsPerPage: number = 20;
  private page = 1;


  constructor(private spinner: NgxSpinnerService,
    private beatService: BeatService,
    private feedHubService: FeedHubService,
    private snotifyService: SnotifyService,
    private loadingService: LoadingService,
    private userSerivce: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    // this.userSubscription = this.authService.user
    //   .subscribe(user => {
    //     if (user) {
    //       this.fetchUserFavourites()
    //       .pipe(switchMap(beats => {

    //       }))
    //       .subscribe(beats => {
    //         this.userFavourites = beats;
    //       })
    //     }
    //   });

    this.fetchInitialBeats()
      // .pipe(tap(beats => {
      //   beats.forEach((beat) => {
      //     debugger;
      //     if (this.userFavourites.includes(beat)) {
      //       beat.isLiked = true;
      //     }
      //     else {
      //       beat.isLiked = false;
      //     }
      //   })
      // }
      // ))
      .subscribe(beats => {
        if (beats.length < this.itemsPerPage) {
          this.hasMoreBeatsToInclude = false;
        }
        this.beats = beats;
        this.beatsCount = beats.length;
        this.spinner.hide('routing');
      });
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

  private fetchInitialBeats(): Observable<Array<Beat>> {
    return this.beatService.getBeats(this.itemsPerPage, (this.page - 1) * this.itemsPerPage);
  }

  private fetchUserFavourites(): Observable<Array<Beat>> {
    return this.userSerivce.getFavourites();
  }

  ngAfterViewInit() {
    this.loadingService.stopLoading();
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
}
