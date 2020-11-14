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

//     id: 1003
// imageUrl: "https://beatswave.blob.core.windows.net:443/photos/MIR_1281.jpg"
// name: "Scent Of A Woman"
// producerUserName: "puqka"
// url: "https://beatswave.blob.core.windows.net:443/beats/Al%20Pacino%20-%20Scent%20of%20a%20Woman%20Tango%20Scene-[AudioTrimmer%20(mp3cut.net).mp3"

                    // id: 2,
                    // favorite: true,
                    // name: 'Shack your butty',
                    // artist: 'Gerrina Linda',
                    // album: 'Hot Shot',
                    // url: './assets/audio/ringtone-2.mp3',
                    // cover_art_url: './assets/images/cover/small/2.jpg',
                    // cover_url: './assets/images/cover/large/2.jpg',
                    // ratings: 4,
                    // composer: 'Gerrina Linda',
                    // lyricist: 'Gerrina Linda',
                    // director: 'Gerrina Linda',
                    // downloads: '10,234,014',
}
