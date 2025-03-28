import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/Services/cart.service';

interface Product {
  id: number;
  title: string;
  price: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  private cartService = inject(CartService);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.http.get<any[]>('https://fakestoreapi.com/products')
      .subscribe({
        next: (data) => {
          this.products = data.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price
          }));
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to fetch products. Please try again later.';
          this.isLoading = false;
          console.error('Error fetching products:', err);
        }
      });
  }

  addToCart(product: Product): void {
    this.cartService.AddToCart(product); 
    console.log(`${product.title} added to cart.`);
  }
}