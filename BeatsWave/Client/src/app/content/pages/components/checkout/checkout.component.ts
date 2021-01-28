import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Beat } from 'src/app/core/models/Beat';
import { BeatService } from 'src/app/core/services/beat.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  public totalPrice: number = 0;
  public beats: Array<Beat>;
  imageBorderRadiusClass = 'card-img--radius-sm';

  constructor(private spinner: NgxSpinnerService,
    private beatService: BeatService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.fetchBeats().pipe(
      tap(beats => beats.forEach(beat => {
        this.totalPrice += beat.price;
      }))
    ).subscribe(beats => {
      this.beats = beats;
    }, () => {
      this.spinner.hide('routing');
    }, () => {
      this.spinner.hide('routing');
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
    let beat = this.beats.find(b => b.id == beatId);
    this.totalPrice -= beat.price;
    this.beats = this.beats.filter(beat => beat.id != beatId);
  }
}
