import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, first, map, mergeMap } from 'rxjs/operators';

import { ArtistService } from 'src/app/core/services/artist.service';
import { Artist } from 'src/app/core/models/Artist';
import { FollowService } from 'src/app/core/services/follow.service';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html'
})
export class ArtistDetailsComponent implements OnInit {

  public followers: number;
  public isFollowing: boolean;
  public artistDetails: Artist;
  public artistBeats: number;
  private artistId: number;

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private artistService: ArtistService,
    private followService: FollowService,
    private snotifyService: SnotifyService) {
  }

  ngOnInit() {
    this.fetchData()
      .subscribe(res => {
        this.artistDetails = res;
        this.followers = this.artistDetails.followersCount;
        this.artistBeats = this.artistDetails.beats.length;
      }, () => { }, () => {
        this.spinner.hide('routing');
      });
    this.followService.isArtistFollowedByCurrentUser(this.artistId).subscribe(res => {
      this.isFollowing = res;
    })
  }

  private fetchData(): Observable<Artist> {
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
    if (!this.isFollowing) {
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
}
