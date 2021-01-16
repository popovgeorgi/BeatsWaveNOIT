import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Beat } from 'src/app/core/models/Beat';
import { BeatService } from 'src/app/core/services/beat.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  public beats: Array<Beat>;

  constructor(private spinner: NgxSpinnerService,
    private beatService: BeatService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.fetchBeats().subscribe(beats => {
      this.beats = beats;
    })
  }

  fetchIdsFromLocalStorage(): Array<number> {
    return this.localStorageService.getLocalStorage('cartInformation');
  }

  fetchBeats(): Observable<Array<Beat>> {
    let ids = this.fetchIdsFromLocalStorage();
    return this.beatService.getBeatsByIds(ids);
  }

  onRemoveSong(beatId: number) {
    this.beats = this.beats.filter(beat => beat.id != beatId);
  }

  ngAfterViewInit(): void {
    this.spinner.hide('routing');
  }
}
