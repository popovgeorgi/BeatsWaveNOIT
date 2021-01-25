import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Beat } from 'src/app/core/models/Beat';
import { BeatService } from 'src/app/core/services/beat.service';

@Component({
  selector: 'app-user-my-beats',
  templateUrl: './user-my-beats.component.html',
})
export class UserMyBeatsComponent implements OnInit {

  public selector: string = '#pageWrapper'
  public beats: Beat[];
  public beatsCount: number;
  public gridView = false;
  private takeBeatsCount: number = 20;

  constructor(private spinner: NgxSpinnerService,
    private beatService: BeatService) { }

  ngOnInit() {
    this.fetchBeats().subscribe(beats => {
      this.beats = beats;
      this.beatsCount = beats.length;
    }, () => { }, () => {
      this.spinner.hide('routing')
    });
  }

  private fetchBeats(): Observable<Array<Beat>> {
    return this.beatService.getCurrentUserBeats()
  }
}
