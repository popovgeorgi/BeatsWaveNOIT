import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  favoriteSongs: Beat[] = [];
  songs: any = {};
  gridView = false;

  constructor(private spinner: NgxSpinnerService,
    private songsConfigService: SongsConfigService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.initSongs();
    this.fetchData().subscribe(res => {
      this.favoriteSongs = res;
    }, () => { }, () => {
      this.spinner.hide('routing')
    });
  }

  public onSelect(event) {
    let option = event.target.value;
    if (option == 0) {
      this.favoriteSongs = this.favoriteSongs.sort((a, b) => {
        return <any>new Date(b.createdOn) - <any>new Date(a.createdOn);
      });
    }
    else if (option == 1) {
      this.favoriteSongs = this.favoriteSongs.sort((a, b) => b.likesCount - a.likesCount);
    }
  }

  public goToFeed() {
    this.router.navigate(['/music']);
  }

  private fetchData(): Observable<Array<Beat>> {
    return this.userService.getFavourites()
  }

  initSongs() {
    this.songs = {
      title: 'Also Like',
      subTitle: 'Check it out these songs',
      page: '/songs',
      items: this.songsConfigService.songsList
    };
  }

}
