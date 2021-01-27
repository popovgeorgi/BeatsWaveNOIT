import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Beat } from 'src/app/core/models/Beat';
import { LikeService } from 'src/app/core/services/like.service';

@Component({
  selector: 'app-song-options',
  templateUrl: './song-options.component.html'
})
export class SongOptionsComponent implements OnInit {

  @HostBinding('class') class = 'dropleft';

  @Output() onVote = new EventEmitter<boolean>();
  @Input() song: Beat;
  @Input() icon = '';

  constructor(private likeService: LikeService,
    private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.icon = 'la ' + this.icon;
  }

  addFavorite() {
    this.likeService.vote(this.song.id).subscribe(res => {
      if (res == true) {
        this.snotifyService.success('Liked ' + this.song.name);
        this.onVote.emit(true);
      }
      else {
        this.snotifyService.success('Unliked ' + this.song.name);
        this.onVote.emit(false);
      }
    });
  }

  addToPlayList() {
  }

}
