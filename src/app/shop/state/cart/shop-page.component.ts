import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartIconComponent } from './cart-icon.component';
import { Product } from './cart.actions';
import * as CartActions from './cart.actions';

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299, image: '💻', description: 'Ordinateur portable haute performance', stock: 5 },
  { id: 2, name: 'Smartphone X', price: 899, image: '📱', description: 'Dernier smartphone avec écran OLED', stock: 12 },
  { id: 3, name: 'Casque Audio', price: 299, image: '🎧', description: 'Réduction de bruit active', stock: 8 },
  { id: 4, name: 'Montre Connectée', price: 399, image: '⌚', description: 'Suivi santé et fitness', stock: 15 },
  { id: 5, name: 'Tablette', price: 599, image: '📲', description: 'Écran 11 pouces, stylet inclus', stock: 0 },
  { id: 6, name: 'Clavier Mécanique', price: 149, image: '⌨️', description: 'RGB, switches mécaniques', stock: 20 }
];

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, CartIconComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🏠</span>
            <h1 class="text-2xl font-bold">My Shop</h1>
          </div>
          
          <div class="flex gap-4">
            <button class="px-4 py-2 rounded-lg bg-white/20">
              Produits
            </button>
            <app-cart-icon></app-cart-icon>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="max-w-6xl mx-auto p-6">
        <h2 class="text-3xl font-bold mb-6">Nos Produits</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            *ngFor="let product of products" 
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div class="text-6xl text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100">
              {{ product.image }}
            </div>
            <div class="p-4">
              <h3 class="font-bold text-xl mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>
              
              <div class="flex items-center gap-2 mb-3">
                <span class="text-sm" [ngClass]="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                  📦 {{ product.stock > 0 ? product.stock + ' en stock' : 'Rupture de stock' }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-blue-600">{{ product.price }}€</span>
                <div class="flex gap-2">
                  <button
                    (click)="viewDetails(product.id)"
                    class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Détails
                  </button>
                  <button
                    (click)="addToCart(product)"
                    [disabled]="product.stock === 0"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ShopPageComponent implements OnInit {
  products = MOCK_PRODUCTS;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(CartActions.loadCart());
  }

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addItem({ product, quantity: 1 }));
    alert(`${product.name} ajouté au panier ✓`);
  }

  viewDetails(productId: number) {
    this.router.navigate(['/shop/product', productId]);
  }
}