import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../core/services/loading.service';
import { Beat } from 'src/app/core/models/Beat';
import { BeatService } from 'src/app/core/services/beat.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html'
})
export class SongsComponent implements OnInit {

  public beats: Beat[];
  public beatsCount: number;
  public gridView = false;
  private takeBeatsCount: number = 8;

  constructor(private spinner: NgxSpinnerService,
    private beatService: BeatService) { }

  ngOnInit() {
    this.fetchBeats();
  }

  private fetchBeats() {
    this.beatService.getBeats(this.takeBeatsCount, 0).subscribe(beats => {
      this.beats = beats;
      this.beatsCount = beats.length;
    }, () => { }, () => {
      this.spinner.hide('routing');
    })
  }
}
