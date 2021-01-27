import { AfterViewInit, Component, OnInit } from '@angular/core';

import { GenresConfigService } from '../../../../core/services/genres-config.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html'
})
export class GenresComponent implements OnInit, AfterViewInit {

  genres: any = [];

  constructor(
    private genresConfigService: GenresConfigService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initGenres();
  }

  ngAfterViewInit() {
    this.spinner.hide('routing');
  }

  // Initialize music genres
  initGenres() {
    this.genres = this.genresConfigService.genresList;
  }

}
