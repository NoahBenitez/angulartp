// src/app/state/products/products.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product, ProductRating, ProductsFilters } from './products.actions';

export interface ProductsState {
  products: Product[];
  count: number;
  filters: ProductsFilters;
  loading: boolean;
  error: string | null;
  selectedRating: ProductRating | null;
  ratingLoading: boolean;
  ratingError: string | null;
}

export const initialState: ProductsState = {
  products: [],
  count: 0,
  filters: {
    page: 1,
    page_size: 10,
  },
  loading: false,
  error: null,
  selectedRating: null,
  ratingLoading: false,
  ratingError: null,
};

export const productsReducer = createReducer(
  initialState,
  // Load Products
  on(ProductsActions.loadProducts, (state, { filters }) => ({
    ...state,
    filters,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { data }) => ({
    ...state,
    products: data.results,
    count: data.count,
    loading: false,
    error: null,
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Load Rating
  on(ProductsActions.loadRating, (state) => ({
    ...state,
    ratingLoading: true,
    ratingError: null,
  })),
  on(ProductsActions.loadRatingSuccess, (state, { rating }) => ({
    ...state,
    selectedRating: rating,
    ratingLoading: false,
    ratingError: null,
  })),
  on(ProductsActions.loadRatingFailure, (state, { error }) => ({
    ...state,
    ratingLoading: false,
    ratingError: error,
  }))
);