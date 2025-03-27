import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   apiUrl = 'https://fakestoreapi.com/products';
  constructor() { }
}
