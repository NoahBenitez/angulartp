// src/app/state/auth/auth.actions.ts
import { createAction, props } from '@ngrx/store';

// Login
export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ access: string; refresh: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Refresh Token
export const refreshToken = createAction('[Auth] Refresh Token');

export const refreshSuccess = createAction(
  '[Auth] Refresh Success',
  props<{ access: string }>()
);

export const refreshFailure = createAction(
  '[Auth] Refresh Failure',
  props<{ error: string }>()
);

// Logout
export const logout = createAction('[Auth] Logout');