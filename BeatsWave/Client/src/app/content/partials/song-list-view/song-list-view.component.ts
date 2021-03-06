import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Beat } from 'src/app/core/models/Beat';

@Component({
    selector: 'app-song-list-view',
    templateUrl: './song-list-view.component.html'
})
export class SongListViewComponent implements OnInit {

    @HostBinding('class') classes = 'song-list--item';

    @Input() song: Beat;
    @Input() songNumber: number;
    @Input() imageBorderRadiusClass = 'card-img--radius-sm';
    @Input() icon = 'la-ellipsis-v';
    @Input() playlist: any;
    @Input() songIndex: number;

    constructor() { }

    ngOnInit() {
        if (this.playlist) {
            this.classes += ' amplitude-song-container amplitude-play-pause';
        }
    }

    public changeHeartDisplay(isLiked) {
      if (isLiked) {
        this.song.isLiked = true;
        this.song.likesCount++;
      }
      else {
        this.song.isLiked = false;
        this.song.likesCount--;
      }
    }
}
