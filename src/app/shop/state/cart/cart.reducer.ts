import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartItem } from './cart.actions';

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  count: number;
}

export const initialState: CartState = {
  items: [],
  totalPrice: 0,
  count: 0
};

export const cartReducer = createReducer(
  initialState,
  
  on(CartActions.addItem, (state, { product, quantity }) => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    let newItems: CartItem[];
    if (existingItem) {
      newItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...state.items, { ...product, quantity }];
    }
    
    return calculateTotals({ ...state, items: newItems });
  }),
  
  on(CartActions.removeItem, (state, { productId }) => {
    const newItems = state.items.filter(item => item.id !== productId);
    return calculateTotals({ ...state, items: newItems });
  }),
  
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      const newItems = state.items.filter(item => item.id !== productId);
      return calculateTotals({ ...state, items: newItems });
    }
    
    const newItems = state.items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    return calculateTotals({ ...state, items: newItems });
  }),
  
  on(CartActions.clearCart, () => initialState),
  
  on(CartActions.loadCart, (state) => {
    const savedCart = localStorage.getItem('myShopCart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      return calculateTotals({ ...state, items });
    }
    return state;
  })
);

function calculateTotals(state: CartState): CartState {
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Sauvegarder dans localStorage
  localStorage.setItem('myShopCart', JSON.stringify(state.items));
  
  return { ...state, totalPrice, count };
}

