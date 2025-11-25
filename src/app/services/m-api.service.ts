import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface OrderConfirmation {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
}

export interface CartValidation {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  
  // GET /api/products/:id/
  getProductDetails(id: number): Observable<any> {
    const products = [
      { id: 1, name: 'Laptop Pro', price: 1299, image: '💻', description: 'Ordinateur portable haute performance', stock: 5, specs: ['Intel i7', '16GB RAM', '512GB SSD'] },
      { id: 2, name: 'Smartphone X', price: 899, image: '📱', description: 'Dernier smartphone avec écran OLED', stock: 12, specs: ['5G', 'OLED 6.5"', '128GB'] },
      // ... autres produits
    ];
    
    const product = products.find(p => p.id === id);
    return of(product).pipe(delay(500));
  }

  // POST /api/cart/validate/
  validateCart(items: any[]): Observable<CartValidation> {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.2; // TVA 20%
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    return of({ subtotal, tax, shipping, total }).pipe(delay(300));
  }

  // POST /api/order/
  createOrder(orderData: any): Observable<OrderConfirmation> {
    const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    return of({
      orderNumber,
      status: 'confirmed',
      estimatedDelivery: deliveryDate.toLocaleDateString('fr-FR')
    }).pipe(delay(800));
  }
}
