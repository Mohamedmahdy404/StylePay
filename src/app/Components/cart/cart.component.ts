import { Component, inject } from '@angular/core';
import { CartService } from './Services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  Products: any = [];
  private cart = inject(CartService);
  Productquntity: ICartQuantuty[] = [];
  constructor() { }

  ngOnInit() {
    this.Products = this.cart.getProductsInCart();
    this.Productquntity = this.Products.map((product: any) => ({
      id: product.id,
      quantity: product.quantity || 1 // Initialize with product's quantity if available
    }));
  }

  removeFromCart(product: any) {
    this.cart.removeProduct(product);
    this.Products = this.Products.filter((p: any) => p.id !== product.id);
  }

  getSubtotal() {
    return this.Products.reduce((acc: any, product: any) => acc + product.price, 0);
  }

  updateQuantity(id: number, _quantity: number) {
    const index = this.Productquntity.findIndex((item: ICartQuantuty) => item.id === id);
    if (index !== -1) {
      this.Productquntity[index].quantity = _quantity;
      const productIndex = this.Products.findIndex((product: any) => product.id === id);
      if (productIndex !== -1) {
        this.Products[productIndex].quantity = _quantity; // Update the product's quantity
      }
    }
  }

  getTotal() {
    return this.Productquntity.reduce((acc: number, item: ICartQuantuty) => {
      const product = this.Products.find((p: any) => p.id === item.id);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0) + 5; // Adding $5 shipping
  }
}

type ICartQuantuty = {
  id: number;
  quantity: number;
}