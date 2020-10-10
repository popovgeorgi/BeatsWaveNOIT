import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-song-options',
    templateUrl: './song-options.component.html'
})
export class SongOptionsComponent implements OnInit {

    @HostBinding('class') class = 'dropleft';

    @Input() song: any;
    @Input() icon = '';

    constructor() { }

    ngOnInit() {
        this.icon = 'la ' + this.icon;
    }

    addFavorite() {
        this.song.favorite = true;
    }

    addToPlayList() {
    }

    shareSong() {
    }

}
