// src/app/state/products/products.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectProductsCount = createSelector(
  selectProductsState,
  (state) => state.count
);

export const selectProductsFilters = createSelector(
  selectProductsState,
  (state) => state.filters
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectSelectedRating = createSelector(
  selectProductsState,
  (state) => state.selectedRating
);

export const selectRatingLoading = createSelector(
  selectProductsState,
  (state) => state.ratingLoading
);

export const selectRatingError = createSelector(
  selectProductsState,
  (state) => state.ratingError
);