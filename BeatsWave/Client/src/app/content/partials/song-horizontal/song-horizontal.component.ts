import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../../../core/services/search.service';
import { AudioPlayerService } from '../../../core/services/audio-player.service';
import { Beat } from 'src/app/core/models/Beat';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BeatService } from 'src/app/core/services/beat.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-song-horizontal',
  templateUrl: './song-horizontal.component.html'
})
export class SongHorizontalComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  @HostBinding('class') classes = 'song-h';

  @Input() song: Beat;
  @Input() largeImage = false;
  @Input() imageBorderRadiusClass = 'card-img--radius-sm';
  @Input() playlist: any;
  @Input() routeLink = '';
  @Input() songIndex: number;

  constructor(private router: Router,
    private searchService: SearchService,
    private audioPlayerService: AudioPlayerService,
    private authService: AuthService,
    private beatService: BeatService) { }

  @HostListener('click') onClick() {
    this.searchService.hideSearchResult();
    if (this.playlist) {
      this.audioPlayerService.playNowPlaylist(this.playlist, this.songIndex);
    } else if (this.routeLink) {
      this.router.navigate([this.routeLink]);
    } else {
      this.audioPlayerService.playSong(this.song);

      let userId = this.authService.getUserId();
      if (userId != null && userId != this.song.producerId) {
        this.beatService.addPlay(this.song.id).subscribe();
      }
    }
  }

  ngOnInit() {
    if (this.largeImage) {
      this.classes += ' song-h--lg';
    } else {
      this.classes += ' song-h--sm';
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
