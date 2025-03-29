import { CommonModule } from '@angular/common';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  newProduct = { title: '', category: '', price: 0, image: '' };
  editedProduct = { id: 0, title: '', category: '', price: 0, image: '' };

  constructor(private http :HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<any[]>('https://fakestoreapi.com/products')
      .subscribe({
        next:(data)=>{
          this.products = data
            .filter(item => item.category !== 'electronics')
            .map(item => ({
              id: item.id,
              title: item.title,
              price: item.price,
              image: item.image,
              category: item.category}));
          this.categories = [...new Set(data.map(item => item.category))];
        }
      })
  }

  deleteProduct(productId: number): void {
    this.http.delete(`https://fakestoreapi.com/products/${productId}`)
      .subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId);
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
  }

  createProduct(): void {
    this.http.post('https://fakestoreapi.com/products', this.newProduct)
      .subscribe({
        next: (product) => {
          this.products.push(product);
          this.newProduct = { title: '', category: '', price: 0, image: '' }; // Reset form
        },
        error: (err) => {
          console.error('Error creating product:', err);
        }
      });
  }

  editProduct(product: any): void {
    this.editedProduct = { ...product }; 
  }

  updateProduct(): void {
    this.http.put(`https://fakestoreapi.com/products/${this.editedProduct.id}`, this.editedProduct)
      .subscribe({
        next: (updatedProduct) => {
          const index = this.products.findIndex(p => p.id === this.editedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.editedProduct = { id: 0, title: '', category: '', price: 0, image: '' }; 
        },
        error: (err) => {
          console.error('Error updating product:', err);
        }
      });
  }
}
