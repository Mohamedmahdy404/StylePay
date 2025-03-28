import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../Components/cart/Services/cart.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private Cart = inject(CartService);
  productsInCart: number = 0;
  private cartSubscription!: Subscription;

  constructor() { }

  ngOnInit() {
    this.cartSubscription = this.Cart.cartCount$.subscribe(count => {
      this.productsInCart = count;
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
