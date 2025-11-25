import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotal } from './cart.selectors';
// Type CartItem défini dans actions
import { CartItem } from './cart.actions';

// Actions (même dossier)
import * as CartActions from './cart.actions';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  step = 1;
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  
  address = {
    name: '',
    street: '',
    city: '',
    postal: '',
    country: ''
  };
  
  orderNumber = '';

  constructor(private store: Store, private router: Router) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  goToCart() {
    this.router.navigate(['/shop/cart']);
  }

  completeOrder() {
    this.orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    this.store.dispatch(CartActions.clearCart());
    this.step = 3;
  }

  goToShop() {
    this.router.navigate(['/shop']);
  }
}

