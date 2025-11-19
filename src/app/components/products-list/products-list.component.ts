// src/app/components/products-list/products-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

export interface ProductListItem {
  id: number;
  name: string;
  price: number;
  created_at: string;
  avgRating?: number;
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="products-list">
      <h2 *ngIf="title">{{ title }}</h2>
      <div class="products-grid">
        <app-product-card
          *ngFor="let product of products"
          [name]="product.name"
          [price]="product.price"
          [created_at]="product.created_at"
          [avgRating]="product.avgRating">
        </app-product-card>
      </div>
      <div *ngIf="products.length === 0" class="empty-state">
        No products available
      </div>
    </div>
  `,
  styles: [`
    .products-list {
      padding: 16px;
    }

    h2 {
      margin-bottom: 16px;
      color: #333;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 1.1em;
    }
  `]
})
export class ProductsListComponent {
  @Input() products: ProductListItem[] = [];
  @Input() title?: string;
}