import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnDestroy {
  public count: number;
  public cartNumber: Subscription = this.cartService.count.subscribe(res => {
    this.count = res;
  });

  constructor(private cartService: CartService,
    private router: Router) { }

  openCheckoutComponent() {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy() {
    this.cartNumber.unsubscribe();
  }
}
