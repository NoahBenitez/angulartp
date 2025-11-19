// src/app/app.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { selectIsAuthenticated, selectAccessToken } from './state/auth/auth.selectors';
import * as AuthActions from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span class="app-title">My Shop</span>
      <span class="spacer"></span>
      
      <button mat-button routerLink="/login">
        <mat-icon>login</mat-icon>
        Login
      </button>
      
      <button mat-button routerLink="/shop/products">
        <mat-icon>shopping_cart</mat-icon>
        Products
      </button>
      
      <button mat-button routerLink="/shop/rating">
        <mat-icon>star</mat-icon>
        Ratings
      </button>

      <span class="spacer"></span>

      <mat-chip *ngIf="isAuthenticated$ | async" class="auth-chip">
        <mat-icon>check_circle</mat-icon>
        Logged In
      </mat-chip>

      <button 
        mat-button 
        *ngIf="isAuthenticated$ | async"
        (click)="logout()">
        <mat-icon>logout</mat-icon>
        Logout
      </button>
    </mat-toolbar>

    <main class="main-content">
      <router-outlet />
    </main>
  `,
  styles: [`
    .app-title {
      font-size: 1.5em;
      font-weight: 600;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .main-content {
      padding: 20px;
      min-height: calc(100vh - 64px);
      background-color: #fafafa;
    }

    .auth-chip {
      margin-right: 16px;
      background-color: #4caf50 !important;
      color: white !important;
    }

    button mat-icon {
      margin-right: 4px;
    }
  `]
})
export class AppComponent {
  private store = inject(Store);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}