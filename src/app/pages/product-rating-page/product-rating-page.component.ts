// src/app/pages/product-rating-page/product-rating-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import * as ProductsActions from '../../state/products/products.actions';
import {
  selectSelectedRating,
  selectRatingLoading,
  selectRatingError
} from '../../state/products/products.selectors';

interface Rating {
  product_id: number;
  avg_rating: number;
  count: number;
}

@Component({
  selector: 'app-product-rating-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <div class="rating-container">
      <mat-card class="rating-card">
        <mat-card-header>
          <mat-card-title>Product Rating</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="ratingForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Product ID</mat-label>
              <input matInput formControlName="productId" type="number" min="1" />
              <mat-error *ngIf="ratingForm.get('productId')?.hasError('required')">
                Product ID is required
              </mat-error>
              <mat-error *ngIf="ratingForm.get('productId')?.hasError('min')">
                Product ID must be at least 1
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="ratingForm.invalid || (loading$ | async)"
              class="full-width"
            >
              <span *ngIf="!(loading$ | async)">Get Rating</span>
              <mat-spinner *ngIf="loading$ | async" diameter="20"></mat-spinner>
            </button>
          </form>

          <div *ngIf="error$ | async as error" class="error-message">
            <mat-icon>error</mat-icon>
            {{ error }}
          </div>

          <div *ngIf="rating$ | async as rating" class="rating-result">
            <h3>Rating Information</h3>
            <div class="rating-details">
              <div class="rating-item">
                <span class="label">Product ID:</span>
                <span class="value">{{ rating.product_id }}</span>
              </div>
              <div class="rating-item">
                <span class="label">Average Rating:</span>
                <span class="value rating-value">
                  <mat-icon class="star-icon">star</mat-icon>
                  {{ rating.avg_rating | number:'1.1-1' }} / 5.0
                </span>
              </div>
              <div class="rating-item">
                <span class="label">Total Ratings:</span>
                <span class="value">{{ rating.count }}</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .rating-container {
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }

    .rating-card {
      max-width: 500px;
      width: 100%;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #f44336;
      margin-top: 16px;
      padding: 12px;
      background-color: #ffebee;
      border-radius: 4px;
    }

    .rating-result {
      margin-top: 24px;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .rating-result h3 {
      margin-top: 0;
      margin-bottom: 16px;
      color: #333;
    }

    .rating-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .rating-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #ddd;
    }

    .rating-item:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 500;
      color: #666;
    }

    .value {
      font-weight: 600;
      color: #333;
    }

    .rating-value {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #ff9800;
      font-size: 1.1em;
    }

    .star-icon {
      color: #ff9800;
      font-size: 20px;
      height: 20px;
      width: 20px;
    }

    button mat-spinner {
      display: inline-block;
      margin: 0 auto;
    }
  `]
})
export class ProductRatingPageComponent {
  ratingForm: FormGroup;
  rating$!: Observable<Rating | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.ratingForm = this.fb.group({
      productId: [1, [Validators.required, Validators.min(1)]]
    });

    this.rating$ = this.store.select(selectSelectedRating);
    this.loading$ = this.store.select(selectRatingLoading);
    this.error$ = this.store.select(selectRatingError);
  }

  onSubmit(): void {
    if (this.ratingForm.valid) {
      const id = this.ratingForm.value.productId;
      this.store.dispatch(ProductsActions.loadRating({ id }));
    }
  }
}
