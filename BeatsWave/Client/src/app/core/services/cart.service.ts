import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private number = this.getCurrentNumber();
  public count = new BehaviorSubject<number>(this.number);

  constructor(private localStorageService: LocalStorageService) { }

  add(id: number) {
    let cart: Array<number> = this.localStorageService.getLocalStorage('cartInformation');
    if (cart.includes(id)) {
      return 'You already have that beat in your cart!';
    }
    cart.push(id);
    this.localStorageService.setLocalStorage('cartInformation', cart);
    this.number += 1;
    this.count.next(this.number);
  }

  remove(id: number) {
    let cart: Array<number> = this.localStorageService.getLocalStorage('cartInformation');
    if (!cart.includes(id)) {
      return 'You do not have that beat in your cart!';
    }
    cart = cart.filter(order => order != id);
    this.localStorageService.setLocalStorage('cartInformation', cart);
  }

  getCurrentNumber(): number {
    let cart: Array<number> = this.localStorageService.getLocalStorage('cartInformation');
    return cart.length;
  }
}
