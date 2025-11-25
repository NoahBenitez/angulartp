import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectCartCount } from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="goToCart()"
      class="relative px-4 py-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2"
    >
      🛒 Panier
      <span 
        *ngIf="(cartCount$ | async)! > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
      >
        {{ cartCount$ | async }}
      </span>
    </button>
  `
})
export class CartIconComponent {
  cartCount$: Observable<number>;

  constructor(private store: Store, private router: Router) {
    this.cartCount$ = this.store.select(selectCartCount);
  }

  goToCart() {
    this.router.navigate(['/shop/cart']);
  }
}