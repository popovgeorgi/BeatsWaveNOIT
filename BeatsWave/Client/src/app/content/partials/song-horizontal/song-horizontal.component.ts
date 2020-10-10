import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../../../core/services/search.service';
import { AudioPlayerService } from '../../../core/services/audio-player.service';

@Component({
    selector: 'app-song-horizontal',
    templateUrl: './song-horizontal.component.html'
})
export class SongHorizontalComponent implements OnInit {

    @HostBinding('class') classes = 'song-h';

    @Input() song: any = {};
    @Input() largeImage = false;
    @Input() imageBorderRadiusClass = 'card-img--radius-sm';
    @Input() playlist: any;
    @Input() routeLink = '';
    @Input() songIndex: number;

    constructor(private router: Router,
                private searchService: SearchService,
                private audioPlayerService: AudioPlayerService) { }

    @HostListener('click') onClick() {
        this.searchService.hideSearchResult();
        if (this.playlist) {
            // Add playlist in audio play and play selected song
            this.audioPlayerService.playNowPlaylist(this.playlist, this.songIndex);
        } else if (this.routeLink) {
            this.router.navigate([this.routeLink]);
        } else {
            // Play selected song
            this.audioPlayerService.playSong(this.song);
        }
    }

    ngOnInit() {
        if (this.largeImage) {
            this.classes += ' song-h--lg';
        } else {
            this.classes += ' song-h--sm';
        }
    }

}
