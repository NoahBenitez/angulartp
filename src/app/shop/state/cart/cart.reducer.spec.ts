import { cartReducer, initialState } from './cart.reducer';
import * as CartActions from './cart.actions';

describe('CartReducer', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    image: '🧪',
    description: 'Test description',
    stock: 10
  };

  it('should return the initial state', () => {
    const action = { type: 'NOOP' } as any;
    const result = cartReducer(undefined, action);
    expect(result).toEqual(initialState);
  });

  it('should add item to cart', () => {
    const action = CartActions.addItem({ product: mockProduct, quantity: 2 });
    const result = cartReducer(initialState, action);
    
    expect(result.items.length).toBe(1);
    expect(result.items[0].quantity).toBe(2);
    expect(result.totalPrice).toBe(200);
    expect(result.count).toBe(2);
  });

  it('should increase quantity when adding existing item', () => {
    const state = cartReducer(
      initialState,
      CartActions.addItem({ product: mockProduct, quantity: 1 })
    );
    
    const result = cartReducer(
      state,
      CartActions.addItem({ product: mockProduct, quantity: 1 })
    );
    
    expect(result.items.length).toBe(1);
    expect(result.items[0].quantity).toBe(2);
    expect(result.totalPrice).toBe(200);
  });

  it('should remove item from cart', () => {
    const state = cartReducer(
      initialState,
      CartActions.addItem({ product: mockProduct, quantity: 1 })
    );
    
    const result = cartReducer(
      state,
      CartActions.removeItem({ productId: mockProduct.id })
    );
    
    expect(result.items.length).toBe(0);
    expect(result.totalPrice).toBe(0);
    expect(result.count).toBe(0);
  });

  it('should update item quantity', () => {
    const state = cartReducer(
      initialState,
      CartActions.addItem({ product: mockProduct, quantity: 1 })
    );
    
    const result = cartReducer(
      state,
      CartActions.updateQuantity({ productId: mockProduct.id, quantity: 5 })
    );
    
    expect(result.items[0].quantity).toBe(5);
    expect(result.totalPrice).toBe(500);
    expect(result.count).toBe(5);
  });

  it('should remove item when quantity is 0', () => {
    const state = cartReducer(
      initialState,
      CartActions.addItem({ product: mockProduct, quantity: 1 })
    );
    
    const result = cartReducer(
      state,
      CartActions.updateQuantity({ productId: mockProduct.id, quantity: 0 })
    );
    
    expect(result.items.length).toBe(0);
  });

  it('should clear cart', () => {
    const state = cartReducer(
      initialState,
      CartActions.addItem({ product: mockProduct, quantity: 3 })
    );
    
    const result = cartReducer(state, CartActions.clearCart());
    
    expect(result).toEqual(initialState);
  });
});
