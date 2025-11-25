import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { CartPageComponent } from './cart-page.component';
import { selectCartItems, selectCartTotal } from './cart.selectors';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let store: MockStore;
  let router: Router;

  const initialState = {
    cart: {
      items: [],
      totalPrice: 0,
      count: 0
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPageComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty cart message when cart is empty', () => {
    store.overrideSelector(selectCartItems, []);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Votre panier est vide');
  });

  it('should display cart items when cart has products', () => {
    const mockItems = [
      { id: 1, name: 'Product 1', price: 100, quantity: 2, image: '📦', description: '', stock: 10 }
    ];
    
    store.overrideSelector(selectCartItems, mockItems);
    store.overrideSelector(selectCartTotal, 200);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Product 1');
  });

  it('should apply coupon code SAVE10', () => {
    component.couponCode = 'SAVE10';
    spyOn(window, 'alert');
    
    component.applyCoupon();
    
    expect(component.discount).toBe(0.1);
    expect(window.alert).toHaveBeenCalledWith('Code promo appliqué: -10% 🎉');
  });

  it('should navigate to checkout', () => {
    component.goToCheckout();
    expect(router.navigate).toHaveBeenCalledWith(['/shop/checkout']);
  });
});
