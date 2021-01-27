import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Beat } from 'src/app/core/models/Beat';
import { UserService } from 'src/app/core/services/user.service';

import { SongsConfigService } from '../../../../core/services/songs-config.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {

  favoriteSongs: Beat[];
  songs: any = {};
  gridView = false;

  constructor(private spinner: NgxSpinnerService,
    private songsConfigService: SongsConfigService,
    private userService: UserService) { }

  ngOnInit() {
    this.initSongs();
    this.fetchData().subscribe(res => {
      this.favoriteSongs = res;
    }, () => { }, () => {
      this.spinner.hide('routing')
    });
  }

  private fetchData(): Observable<Array<Beat>> {
    return this.userService.getFavourites()
  }

  // Initialize song object for section
  initSongs() {
    this.songs = {
      title: 'Also Like',
      subTitle: 'Check it out these songs',
      page: '/songs',
      items: this.songsConfigService.songsList
    };
  }

}
