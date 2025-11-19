// src/app/state/products/products.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as ProductsActions from './products.actions';
import { ShopApiService } from '../../services/shop-api.service';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(({ filters }) =>
        this.shopApi.getProducts(filters).pipe(
          map((data) => ProductsActions.loadProductsSuccess({ data })),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ 
              error: error.message || 'Failed to load products' 
            }))
          )
        )
      )
    )
  );

  loadRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadRating),
      switchMap(({ id }) =>
        this.shopApi.getRating(id).pipe(
          map((rating) => ProductsActions.loadRatingSuccess({ rating })),
          catchError((error) =>
            of(ProductsActions.loadRatingFailure({ 
              error: error.message || 'Failed to load rating' 
            }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private shopApi: ShopApiService
  ) {}
}