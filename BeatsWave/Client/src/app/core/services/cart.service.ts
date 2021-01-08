import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private localStorageService: LocalStorageService) { }

  add(id: number) {
    let cart: Array<number> = this.localStorageService.getLocalStorage('cartInformation');
    if (cart.includes(id)) {
      return 'You already have that beat in your cart!';
    }
    cart.push(id);
    this.localStorageService.setLocalStorage('cartInformation', cart);
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
