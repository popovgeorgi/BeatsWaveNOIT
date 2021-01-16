import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Beat } from 'src/app/core/models/Beat';
import { CartService } from 'src/app/core/services/cart.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-song-list-checkout',
  templateUrl: './song-list-checkout.component.html'
})
export class SongListCheckoutComponent implements OnInit {
  @HostBinding('class') classes = 'song-list--item';

  @Output() removeSong = new EventEmitter<number>();
  @Input() song: Beat;
  @Input() songNumber: number;
  @Input() imageBorderRadiusClass = 'card-img--radius-sm';
  @Input() icon = 'la-ellipsis-v';
  @Input() playlist: any;
  @Input() songIndex: number;

  constructor(private cartService: CartService) { }

  onRemove(beatId: number) {
    this.cartService.remove(beatId);
    this.removeSong.emit(beatId);
  }

  ngOnInit() {
    if (this.playlist) {
      this.classes += ' amplitude-song-container amplitude-play-pause';
    }
  }

}
