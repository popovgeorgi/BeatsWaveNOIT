import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartName = 'cartInformation';
  private number = this.getCurrentNumber();
  public count = new BehaviorSubject<number>(this.number);

  constructor(private localStorageService: LocalStorageService) { }

  add(id: number) {
    if (this.localStorageService.getLocalStorage(this.cartName) == null) {
      this.localStorageService.setLocalStorage(this.cartName, Array<number>());
    }
    let cart: Array<number> = this.localStorageService.getLocalStorage(this.cartName);
    if (cart.includes(id)) {
      return 'You already have that beat in your cart!';
    }
    cart.push(id);
    this.localStorageService.setLocalStorage(this.cartName, cart);
    this.number += 1;
    this.count.next(this.number);
  }

  remove(id: number) {
    let cart: Array<number> = this.localStorageService.getLocalStorage(this.cartName);
    if (cart == null) {
      return;
    }
    if (!cart.includes(id)) {
      return 'You do not have that beat in your cart!';
    }
    cart = cart.filter(order => order != id);
    this.localStorageService.setLocalStorage(this.cartName, cart);
  }

  clear() {
    localStorage.removeItem(this.cartName);
  }

  getCurrentNumber(): number {
    let cart: Array<number> = this.localStorageService.getLocalStorage('cartInformation');
    if (cart == null) {
      return 0;
    }
    return cart.length;
  }
}
