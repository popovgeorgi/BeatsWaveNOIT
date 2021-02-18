import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { Subscription } from 'rxjs';
import { Beat } from 'src/app/core/models/Beat';
import { AuthService } from 'src/app/core/services/auth.service';
import { LikeService } from 'src/app/core/services/like.service';

@Component({
  selector: 'app-song-options',
  templateUrl: './song-options.component.html'
})
export class SongOptionsComponent implements OnInit, OnDestroy {

  @HostBinding('class') class = 'dropleft';

  userSubscription: Subscription;
  @Output() onVote = new EventEmitter<boolean>();
  @Input() song: Beat;
  @Input() icon = '';

  constructor(private likeService: LikeService,
    private snotifyService: SnotifyService,
    private authService: AuthService) {
    this.snotifyService.config = ToastDefaults;
  }

  ngOnInit() {
    this.icon = 'la ' + this.icon;
  }

  addFavorite() {
    this.userSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.likeService.vote(this.song.id).subscribe(res => {
          if (res == true) {
            this.snotifyService.info('Liked ' + this.song.name, '', {
              showProgressBar: false
            });
            this.onVote.emit(true);
          }
          else {
            this.snotifyService.info('Unliked ' + this.song.name, '', {
              showProgressBar: false
            });
            this.onVote.emit(false);
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
}
