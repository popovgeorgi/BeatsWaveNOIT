import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map, mergeMap, tap } from 'rxjs/operators';

import { ArtistService } from 'src/app/core/services/artist.service';
import { Artist } from 'src/app/core/models/Artist';
import { FollowService } from 'src/app/core/services/follow.service';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html'
})
export class ArtistDetailsComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  public isLoggedIn: boolean = false;
  public followers: number;
  public isFollowing: boolean;
  public artistDetails: Artist;
  public artistBeats: number;
  private artistId: number;

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private artistService: ArtistService,
    private followService: FollowService,
    private snotifyService: SnotifyService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.fetchForLoggedUser().subscribe(res => {
          this.isFollowing = res;
        }, () => {}, () => {
          this.spinner.hide('routing');
        })
      }
      else {
        this.fetchArtist()
          .subscribe(res => {
            this.artistDetails = res;
            this.followers = this.artistDetails.followersCount;
            this.artistBeats = this.artistDetails.beats.length;
          }, () => { }, () => {
            this.spinner.hide('routing');
          });
      }
    })
  }

  private fetchForLoggedUser(): Observable<boolean> {
    return this.fetchArtist()
      .pipe(
        tap(artist => {
          this.artistDetails = artist;
          this.followers = this.artistDetails.followersCount;
          this.artistBeats = this.artistDetails.beats.length;
        }),
        mergeMap((value, index) => {
          return this.fetchIfUserIsFollowed();
        }));
  }

  private fetchIfUserIsFollowed(): Observable<boolean> {
    return this.followService.isArtistFollowedByCurrentUser(this.artistId);
  }

  private fetchArtist(): Observable<Artist> {
    return this.route.params.pipe(
      first(),
      map(params => {
        const id = params['id'];
        this.artistId = id
        return id;
      }), mergeMap(id => this.artistService.getArtist(id)));
  }

  public onSelect(event) {
    let option = event.target.value;
    if (option == 0) {
      this.artistDetails.beats = this.artistDetails.beats.sort((a, b) => {
        return <any>new Date(b.createdOn) - <any>new Date(a.createdOn);
      });
    }
    else if (option == 1) {
      this.artistDetails.beats = this.artistDetails.beats.sort((a, b) => b.likesCount - a.likesCount);
    }
  }

  public OnFollowButtonClicked() {
    if (!this.isLoggedIn) {
      this.snotifyService.error('You should be logged in!', '', {
        showProgressBar: false
      });
    }
    else if (this.isFollowing == false) {
      this.followService.follow(this.artistId).subscribe(res => {
        this.isFollowing = true;
        this.followers = this.followers + 1;
      }, (err) => {
        this.snotifyService.warning(err.error)
      }, () => {
        this.snotifyService.info('Followed');
      });
    }
    else {
      this.followService.unFollow(this.artistId).subscribe(res => {
        this.isFollowing = false;
        this.followers = this.followers - 1;
        this.snotifyService.info('Unfollowed');
      })
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
