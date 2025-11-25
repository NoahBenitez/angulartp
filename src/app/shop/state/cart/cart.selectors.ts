import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state) => state.totalPrice
);

export const selectCartCount = createSelector(
  selectCartState,
  (state) => state.count
);
