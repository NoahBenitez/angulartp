// src/app/state/products/products.actions.ts
import { createAction, props } from '@ngrx/store';

export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  ratings?: { score: number }[];
}

export interface ProductsResponse {
  count: number;
  results: Product[];
}

export interface ProductRating {
  product_id: number;
  avg_rating: number;
  count: number;
}

export interface ProductsFilters {
  page?: number;
  page_size?: number;
  min_rating?: number;
  ordering?: string;
}

// Load Products
export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ filters: ProductsFilters }>()
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ data: ProductsResponse }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

// Load Rating
export const loadRating = createAction(
  '[Products] Load Rating',
  props<{ id: number }>()
);

export const loadRatingSuccess = createAction(
  '[Products] Load Rating Success',
  props<{ rating: ProductRating }>()
);

export const loadRatingFailure = createAction(
  '[Products] Load Rating Failure',
  props<{ error: string }>()
);