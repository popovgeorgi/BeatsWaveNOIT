import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

import { AudioPlayerService } from '../../../../../core/services/audio-player.service';
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
    private audioPlayerService: AudioPlayerService,
    private artistService: ArtistService,
    private followService: FollowService,
    private snotifyService: SnotifyService) {
  }

  ngOnInit() {
    this.fetchData().subscribe(res => {
      this.artistDetails = res;
      this.followers = this.artistDetails.followersCount;
      this.artistBeats = this.artistDetails.beats.length;
    }, () => {console.log('fuck')}, () => {
      this.spinner.hide('routing');
    });
    this.followService.isArtistFollowedByCurrentUser(this.artistId).subscribe(res => {
      this.isFollowing = res;
    })
  }

  private fetchData(): Observable<Artist> {
    return this.route.params.pipe(map(params => {
      const id = params['id'];
      this.artistId = id
      return id;
    }), mergeMap(id => this.artistService.getArtist(id)));
  }

  public OnFollowButtonClicked() {
    if (!this.isFollowing) {
      this.followService.follow(this.artistId).subscribe(res => {
        this.isFollowing = true;
        this.followers = this.followers + 1;
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

  playAllSongs() {
    this.audioPlayerService.playNowPlaylist(this.artistDetails);
  }
}
