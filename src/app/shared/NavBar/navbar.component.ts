import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterModule ,Router  } from '@angular/router';
import { CartService } from '../../Components/cart/Services/cart.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,FormsModule ,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private Cart = inject(CartService);
  productsInCart: number = 0;
  private cartSubscription!: Subscription;

  isLoggedIn: boolean = false;


  constructor(private router: Router ) {}

  ngOnInit() {
    this.cartSubscription = this.Cart.cartCount$.subscribe(count => {
      this.productsInCart = count;
    });
    this.isLoggedIn = !!localStorage.getItem('token');

  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  onLogin(): void {
   
    localStorage.setItem('token', 'fake-jwt-token');
    this.isLoggedIn = true; 
    this.router.navigate(['/']); 
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
   
  }
}
