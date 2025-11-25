import { createAction, props } from '@ngrx/store';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export const addItem = createAction(
  '[Cart] Add Item',
  props<{ product: Product; quantity: number }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const loadCart = createAction('[Cart] Load Cart');

