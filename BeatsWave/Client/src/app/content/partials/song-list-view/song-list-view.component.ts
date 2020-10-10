import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-song-list-view',
    templateUrl: './song-list-view.component.html'
})
export class SongListViewComponent implements OnInit {

    @HostBinding('class') classes = 'song-list--item';

    @Input() song: any = {};
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

}
