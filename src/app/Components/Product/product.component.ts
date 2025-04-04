import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgIf, NgSwitchDefault } from '@angular/common';
import { CartService } from '../cart/Services/cart.service';
import { PriceOfferPipe } from '../../Pipe/price-offer.pipe';
import { NgControlStatus } from '@angular/forms';
import { HoverScaleDirective } from '../../Directive/hover-scale.directive';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string; // Added category property
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, PriceOfferPipe,HoverScaleDirective],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  DisplayedProducts: Product[] = [];
  uniqueCategories: string[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  private cartService = inject(CartService);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to access this page');
      window.location.href = '/Login'; // Redirect to login page
      return;
    }
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.http.get<any[]>('https://fakestoreapi.com/products')
      .subscribe({
        next: (data) => {
          this.products = data
            .filter(item => item.category !== 'electronics') // Exclude electronics
            .map(item => ({
              id: item.id,
              title: item.title,
              price: item.price,
              image: item.image,
              category: item.category 
            }));
          this.DisplayedProducts = [...this.products]; // Assign products to DisplayedProducts
          this.uniqueCategories = [...new Set(this.products.map(product => product.category))];
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to fetch products. Please try again later.';
          this.isLoading = false;
          console.error('Error fetching products:', err);
        }
      });
  }

  filterByCategory(category: string): void {
    this.DisplayedProducts = category
      ? this.products.filter(product => product.category === category)
      : [...this.products];
  }

  addToCart(product: Product): void {
    this.cartService.AddToCart(product); 
    console.log(`${product.title} added to cart.`);
  }
}