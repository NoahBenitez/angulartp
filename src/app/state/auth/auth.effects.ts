// src/app/state/auth/auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { ShopApiService } from '../../services/shop-api.service';
 
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.shopApi.login(username, password).pipe(
          map(({ access, refresh }) =>
            AuthActions.loginSuccess({ access, refresh })
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message || 'Login failed' }))
          )
        )
      )
    )
  );
 
  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      // Note: You'd need to get the refresh token from the store
      // For now, this is a placeholder structure
      switchMap(() =>
        of(AuthActions.refreshFailure({ error: 'Refresh not implemented' }))
      )
    )
  );
 
  constructor(
    private actions$: Actions,
    private shopApi: ShopApiService
  ) {}
}