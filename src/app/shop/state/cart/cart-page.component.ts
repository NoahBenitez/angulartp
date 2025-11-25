import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

// Composant du panier (même dossier)
import { CartItemComponent } from './cart-item.component';

// Sélecteurs (même dossier)
import { selectCartItems, selectCartTotal } from './cart.selectors';

// Type CartItem défini dans actions
import { CartItem } from './cart.actions';

// Actions (même dossier)
import * as CartActions from './cart.actions';

@Component({
  selector: 'app-cart-page',
  standalone: true,
 

  template: `
    <!-- ton template ici -->
  `
})
export class CartPageComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  couponCode = '';
  discount = 0;

  constructor(private store: Store, private router: Router) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  ngOnInit() {
    this.store.dispatch(CartActions.loadCart());
  }

  updateQuantity(productId: number, quantity: number) {
    this.store.dispatch(CartActions.updateQuantity({ productId, quantity }));
  }

  removeItem(productId: number) {
    this.store.dispatch(CartActions.removeItem({ productId }));
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  applyCoupon() {
    if (this.couponCode === 'SAVE10') {
      this.discount = 0.1;
      alert('Code promo appliqué: -10% 🎉');
    } else if (this.couponCode === 'SAVE20') {
      this.discount = 0.2;
      alert('Code promo appliqué: -20% 🎉');
    } else {
      alert('Code promo invalide ❌');
    }
  }

  getFinalTotal(): string {
    let total = 0;
    this.cartTotal$.subscribe(t => total = t).unsubscribe();
    return (total - (total * this.discount)).toFixed(2);
  }

  continueShopping() {
    this.router.navigate(['/shop']);
  }

  goToCheckout() {
    this.router.navigate(['/shop/checkout']);
  }
}
