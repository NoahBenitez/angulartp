// src/app/components/product-card/product-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule],
  template: `
    <mat-card class="product-card">
      <mat-card-header>
        <mat-card-title>{{ name }}</mat-card-title>
        <mat-card-subtitle>{{ created_at | date:'mediumDate' }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div class="price-section">
          <span class="price-label">Price:</span>
          <span class="price-value">{{ price | currency }}</span>
        </div>
        <div class="rating-section" *ngIf="avgRating !== undefined">
          <mat-icon class="star-icon">star</mat-icon>
          <span class="rating-value">{{ avgRating | number:'1.1-1' }}</span>
          <span class="rating-max">/ 5.0</span>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .product-card {
      max-width: 300px;
      margin: 8px;
    }

    .price-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding: 8px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .price-label {
      font-weight: 500;
      color: #666;
    }

    .price-value {
      font-size: 1.3em;
      font-weight: 700;
      color: #1976d2;
    }

    .rating-section {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .star-icon {
      color: #ff9800;
      font-size: 20px;
      height: 20px;
      width: 20px;
    }

    .rating-value {
      font-weight: 600;
      color: #333;
    }

    .rating-max {
      color: #999;
      font-size: 0.9em;
    }
  `]
})
export class ProductCardComponent {
  @Input() name = '';
  @Input() price = 0;
  @Input() created_at = '';
  @Input() avgRating?: number;
}