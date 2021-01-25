import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Artist } from 'src/app/core/models/Artist';
import { ArtistService } from 'src/app/core/services/artist.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html'
})
export class ArtistsComponent implements OnInit, AfterViewInit {

  artists: Array<Artist>;
  record: number;
  hasMoreArtistsToInclude: boolean = true;
  private itemsPerPage: number = 20;
  private page = 1;

  constructor(private spinner: NgxSpinnerService,
    private artistService: ArtistService) { }

  ngOnInit() {
    this.fetchArtists().subscribe(artists => {
      if (artists.length < this.itemsPerPage) {
        this.hasMoreArtistsToInclude = false;
      }
      this.artists = artists;
      this.record = artists.length;
    }, () => { }, () => {
      this.spinner.hide('routing');
    });
  }

  public showMore() {
    this.page++;
    this.artistService.getArtists(this.itemsPerPage, (this.page - 1) * this.itemsPerPage).subscribe(artists => {
      if (artists.length < this.itemsPerPage) {
        this.hasMoreArtistsToInclude = false;
      }
      this.artists = this.artists.concat(artists);
    })
  }

  private fetchArtists(): Observable<Array<Artist>> {
    return this.artistService.getArtists(this.itemsPerPage, (this.page - 1) * this.itemsPerPage);
  }

  ngAfterViewInit() {
    this.spinner.hide('primary');
  }
}
