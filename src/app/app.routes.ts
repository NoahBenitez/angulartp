import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ShopPageComponent } from './shop/state/cart/shop-page.component';
import { ProductDetailsPageComponent } from './shop/state/cart/product-details-page.component';
import { CartPageComponent } from './shop/state/cart/cart-page.component';
import { CheckoutComponent } from './shop/state/cart/checkout.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'shop', component: ShopPageComponent },
  { path: 'shop/product/:id', component: ProductDetailsPageComponent },
  { path: 'shop/cart', component: CartPageComponent },
  { path: 'shop/checkout', component: CheckoutComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
