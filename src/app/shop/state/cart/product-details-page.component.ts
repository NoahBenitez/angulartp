import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <button
        (click)="goBack()"
        class="mb-4 text-blue-600 hover:underline"
      >
        ← Retour aux produits
      </button>

      <div *ngIf="product" class="bg-white rounded-xl shadow-lg p-8">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="text-9xl text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg py-16">
            {{ product.image }}
          </div>

          <div>
            <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>
            <p class="text-gray-600 text-lg mb-6">{{ product.description }}</p>

            <div class="flex items-center gap-2 mb-6">
              <span class="text-lg" [ngClass]="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                📦 {{ product.stock > 0 ? product.stock + ' disponibles' : 'Rupture de stock' }}
              </span>
            </div>

            <div class="text-4xl font-bold text-blue-600 mb-6">
              {{ product.price }}€
            </div>

            <div class="flex items-center gap-4 mb-6">
              <span class="font-semibold">Quantité:</span>
              <div class="flex items-center gap-2">
                <button
                  (click)="decreaseQuantity()"
                  class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  ➖
                </button>
                <span class="px-4 py-2 bg-gray-100 rounded-lg font-bold">{{ quantity }}</span>
                <button
                  (click)="increaseQuantity()"
                  class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  ➕
                </button>
              </div>
            </div>

            <button
              (click)="addToCart()"
              [disabled]="product.stock === 0"
              class="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailsPageComponent implements OnInit {
  product: Product | undefined;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = MOCK_PRODUCTS.find(p => p.id === id);
  }

  increaseQuantity() {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product) {
      this.store.dispatch(CartActions.addItem({ 
        product: this.product, 
        quantity: this.quantity 
      }));
      alert(`${this.product.name} ajouté au panier ✓`);
      this.router.navigate(['/shop']);
    }
  }

  goBack() {
    this.router.navigate(['/shop']);
  }
}