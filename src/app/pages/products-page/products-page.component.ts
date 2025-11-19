// src/app/pages/products-page/products-page.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as ProductsActions from '../../state/products/products.actions';
import { 
  selectProducts, 
  selectProductsCount, 
  selectProductsLoading, 
  selectProductsError 
} from '../../state/products/products.selectors';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="products-container">
      <mat-card class="filters-card">
        <mat-card-header>
          <mat-card-title>Product Filters</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="filtersForm" (ngSubmit)="onSubmit()">
            <div class="filters-row">
              <mat-form-field appearance="outline">
                <mat-label>Page</mat-label>
                <input matInput formControlName="page" type="number" min="1">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Page Size</mat-label>
                <input matInput formControlName="page_size" type="number" min="1" max="100">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Min Rating</mat-label>
                <input matInput formControlName="min_rating" type="number" min="0" max="5" step="0.1">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Sort By</mat-label>
                <mat-select formControlName="ordering">
                  <mat-option value="">None</mat-option>
                  <mat-option value="name">Name (A-Z)</mat-option>
                  <mat-option value="-name">Name (Z-A)</mat-option>
                  <mat-option value="price">Price (Low-High)</mat-option>
                  <mat-option value="-price">Price (High-Low)</mat-option>
                  <mat-option value="created_at">Date (Old-New)</mat-option>
                  <mat-option value="-created_at">Date (New-Old)</mat-option>
                </mat-select>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit">
                Apply Filters
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="results-card">
        <mat-card-header>
          <mat-card-title>
            Products 
            <span *ngIf="count$ | async as count" class="count-badge">
              ({{ count }} total)
            </span>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="loading$ | async" class="loading-container">
            <mat-spinner></mat-spinner>
          </div>

          <div *ngIf="error$ | async as error" class="error-message">
            {{ error }}
          </div>

          <table mat-table [dataSource]="(products$ | async) || []" *ngIf="!(loading$ | async)" class="products-table">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> ID </th>
              <td mat-cell *matCellDef="let product"> {{product.id}} </td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Name </th>
              <td mat-cell *matCellDef="let product"> {{product.name}} </td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef> Price </th>
              <td mat-cell *matCellDef="let product"> {{product.price | currency}} </td>
            </ng-container>

            <ng-container matColumnDef="created_at">
              <th mat-header-cell *matHeaderCellDef> Created </th>
              <td mat-cell *matCellDef="let product"> {{product.created_at | date:'short'}} </td>
            </ng-container>

            <ng-container matColumnDef="rating">
              <th mat-header-cell *matHeaderCellDef> Avg Rating </th>
              <td mat-cell *matCellDef="let product"> 
                {{ getAvgRating(product) | number:'1.1-1' }}
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .filters-card, .results-card {
      margin-bottom: 20px;
    }

    .filters-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
    }

    .filters-row mat-form-field {
      flex: 1;
      min-width: 120px;
    }

    .products-table {
      width: 100%;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .error-message {
      color: #f44336;
      text-align: center;
      padding: 20px;
    }

    .count-badge {
      font-size: 0.9em;
      color: #666;
    }
  `]
})
export class ProductsPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  filtersForm: FormGroup;
  products$ = this.store.select(selectProducts);
  count$ = this.store.select(selectProductsCount);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);
  
  displayedColumns: string[] = ['id', 'name', 'price', 'created_at', 'rating'];

  constructor() {
    this.filtersForm = this.fb.group({
      page: [1],
      page_size: [10],
      min_rating: [''],
      ordering: ['']
    });
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    const filters = { ...this.filtersForm.value };
    // Remove empty values
    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null) {
        delete filters[key];
      }
    });
    this.store.dispatch(ProductsActions.loadProducts({ filters }));
  }

  getAvgRating(product: any): number {
    if (!product.ratings || product.ratings.length === 0) return 0;
    const sum = product.ratings.reduce((acc: number, r: any) => acc + r.score, 0);
    return sum / product.ratings.length;
  }
}