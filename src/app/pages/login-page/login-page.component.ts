import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule
  ],
  template: `
    <mat-card class="login-card">
      <h1>Login</h1>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" />
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" />
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit">
          Login
        </button>

        <mat-progress-spinner *ngIf="loading" mode="indeterminate"></mat-progress-spinner>

        <p class="error" *ngIf="error">{{ error }}</p>
      </form>
    </mat-card>
  `,
  styles: [`
    .login-card {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    .full-width { width: 100%; }
    .error { color: red; margin-top: 10px; }
  `]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    @Optional() private router: Router | null,
    @Optional() private snackBar: MatSnackBar | null
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // rien de spécifique pour OnInit ici
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { username, password } = this.loginForm.value;

      // Vérification directe
      if (username === 'Noah' && password === 'Noah2004%') {
        this.snackBar?.open('Login successful!', 'Close', { duration: 3000 });
        this.router?.navigate(['/shop/products']);
      } else {
        this.error = 'Identifiants invalides';
      }

      this.loading = false;
    }
  }
}
