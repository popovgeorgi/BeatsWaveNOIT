import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, mergeMap } from 'rxjs/operators';
import { Beat } from 'src/app/core/models/Beat';
import { BeatService } from 'src/app/core/services/beat.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-genre-listing',
  templateUrl: './genre-listing.component.html',
})
export class GenreListingComponent implements OnInit, AfterViewInit {

  public gridView = false;
  public beats: Beat[];
  public hasMoreBeatsToInclude: boolean = true;
  public beatsCount: number;
  private itemsPerPage: number = 20;
  private page = 1;

  constructor(private beatService: BeatService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.fetchInitialBeats();
  }

  private fetchInitialBeats() {
    this.route.params.pipe(map(params => {
      let genre = params['name'];
      if (genre == 'Hip-Hop') {
        genre = 'HipHop';
      }
      else if (genre == 'R&B') {
        genre = 'RB';
      }
      return genre
    }),
      mergeMap(genre => this.beatService.getBeatsByGenre(genre))).subscribe(beats => {
        this.beats = beats;
        this.beatsCount = beats.length;
      })
  }

  showMore() {
    this.page++;
    this.beatService.getBeats(this.itemsPerPage, (this.page - 1) * this.itemsPerPage).subscribe(beats => {
      if (beats.length < this.itemsPerPage) {
        this.hasMoreBeatsToInclude = false;
      }
      this.beats = this.beats.concat(beats);
    })
  }
  ngAfterViewInit() {
    this.spinner.hide('routing');
  }
}
