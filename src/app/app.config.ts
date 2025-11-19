// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes'; // Assure-toi que ce chemin est correct et que routes est bien exporté

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone change detection
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Routing
    provideRouter(routes),

    // HTTP client
    provideHttpClient(),

    // Animations Angular
    provideAnimationsAsync(),

    // ---------------------------
    // TEMPORAIRE pour tester le routing
    // Décommenter après avoir validé que la page login s’affiche
    // ---------------------------
    /*
    import { provideStore } from '@ngrx/store';
    import { provideEffects } from '@ngrx/effects';
    import { provideStoreDevtools } from '@ngrx/store-devtools';
    import { authReducer } from './state/auth/auth.reducer';
    import { productsReducer } from './state/products/products.reducer';
    import { AuthEffects } from './state/auth/auth.effects';
    import { ProductsEffects } from './state/products/products.effects';

    provideStore({
      auth: authReducer,
      products: productsReducer
    }),
    provideEffects([AuthEffects, ProductsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      trace: false
    })
    */
  ]
};
