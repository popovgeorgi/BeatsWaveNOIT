import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AudioPlayerService } from '../../../../core/services/audio-player.service';
import { Beat } from 'src/app/core/models/Beat';
import { LikeService } from 'src/app/core/services/like.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BeatService } from 'src/app/core/services/beat.service';

@Component({
  selector: 'app-primary-card',
  templateUrl: './primary-card.component.html'
})
export class PrimaryCardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  @Input() isUserOwner: boolean = false;
  @Input() song: Beat;
  @Input() showOptions = false;
  @Input() imageBorderRadiusClass = 'card-img--radius-lg';

  classes = '';

  constructor(private audioPlayerService: AudioPlayerService,
    private likeService: LikeService,
    private snotifyService: SnotifyService,
    private authService: AuthService,
    private beatService: BeatService) {
    this.snotifyService.config = ToastDefaults;
  }

  ngOnInit() {
    this.classes = 'custom-card--img ' + this.imageBorderRadiusClass;
  }

  addFavorite() {
    this.userSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.likeService.vote(this.song.id).subscribe(res => {
          if (res == true) {
            this.song.likesCount++;
            this.snotifyService.info('Liked ' + this.song.name, '', {
              showProgressBar: false
            });
          }
          else {
            this.song.likesCount--;
            this.snotifyService.info('Unliked ' + this.song.name, '', {
              showProgressBar: false
            });
          }
        });
      }
      else {
        this.snotifyService.warning("You must be logged in", '', {
          showProgressBar: false
        });
      }
    })
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  addInPlayer() {
    this.audioPlayerService.playSong(this.song);

    let userId = this.authService.getUserId();
    if (userId != null && userId != this.song.producerId) {
      this.beatService.addPlay(this.song.id).subscribe();
    }
  }
}
