import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  ProducrsInCart: any = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() { }

  AddToCart(product: any) {
    const exists = this.ProducrsInCart.some((item: any) => item.id === product.id);
    if (!exists) {
      this.ProducrsInCart.push(product);
      this.updateCartCount(this.ProducrsInCart.length);
    }
  }

  getProductsInCart() {
    return this.ProducrsInCart;
  }

  getCartCount(): number {
    return this.cartCount.value;
  }

  updateCartCount(newCount: number): void {
    this.cartCount.next(newCount);
  }

  removeProduct(product: any) {
    const index = this.ProducrsInCart.findIndex((item: any) => item.id === product.id);
    if (index !== -1) {
      this.ProducrsInCart.splice(index, 1);
      this.updateCartCount(this.ProducrsInCart.length);
    }
  }
}
