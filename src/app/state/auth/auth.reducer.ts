// src/app/state/auth/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  access: null,
  refresh: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { access, refresh }) => ({
    ...state,
    access,
    refresh,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Refresh
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.refreshSuccess, (state, { access }) => ({
    ...state,
    access,
    loading: false,
  })),
  on(AuthActions.refreshFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Logout
  on(AuthActions.logout, () => initialState)
);