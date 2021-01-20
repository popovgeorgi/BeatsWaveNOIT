import { Component, Input, OnInit } from '@angular/core';

import { AudioPlayerService } from '../../../../core/services/audio-player.service';
import { Beat } from 'src/app/core/models/Beat';
import { LikeService } from 'src/app/core/services/like.service';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'app-primary-card',
    templateUrl: './primary-card.component.html'
})
export class PrimaryCardComponent implements OnInit {

    @Input() isUserOwner: boolean = false;
    @Input() song: Beat;
    @Input() showOptions = false;
    @Input() imageBorderRadiusClass = 'card-img--radius-lg';

    classes = '';

    constructor(private audioPlayerService: AudioPlayerService,
      private likeService: LikeService,
      private snotifyService: SnotifyService) {
    }

    ngOnInit() {
        this.classes = 'custom-card--img ' + this.imageBorderRadiusClass;
    }

    addFavorite() {
      this.likeService.vote(this.song.id).subscribe(res => {
        if (res == true) {
          this.snotifyService.success('Liked ' + this.song.name);
        }
        else {
          this.snotifyService.success('Unliked ' + this.song.name);
        }
      });
    }

    getSongInfo() {}

    addInPlayer() {
        this.audioPlayerService.playSong(this.song);
    }
}
