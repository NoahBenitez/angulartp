import { Component, OnInit } from '@angular/core';
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
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" required />
              <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
                Username is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required />
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>

            <button 
              mat-raised-button 
              color="primary" 
              type="submit"
              class="full-width"
              [disabled]="!loginForm.valid || loading">
              <span *ngIf="!loading">Login</span>
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
            </button>

            <div class="error-message" *ngIf="error">
              {{ error }}
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-card {
      max-width: 400px;
      width: 100%;
      margin: 20px;
    }

    mat-card-header {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    mat-card-title {
      font-size: 24px;
      font-weight: 500;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    button {
      margin-top: 10px;
    }

    .error-message {
      color: #f44336;
      margin-top: 16px;
      padding: 12px;
      background-color: #ffebee;
      border-radius: 4px;
      text-align: center;
    }

    mat-spinner {
      margin: 0 auto;
    }
  `]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Vérifier si déjà connecté (optionnel)
    console.log('Login page initialized');
  }

  onSubmit(): void {
    console.log('🔍 Form submitted');
    console.log('📝 Form valid?', this.loginForm.valid);
    console.log('📦 Form values:', this.loginForm.value);

    if (this.loginForm.invalid) {
      console.log('❌ Form is invalid');
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const { username, password } = this.loginForm.value;

    console.log('👤 Username:', username);
    console.log('🔐 Password length:', password?.length);

    // Simulation d'un délai de connexion (comme une vraie API)
    setTimeout(() => {
      // Vérification des credentials
      if (username === 'Noah' && password === 'Noah2004%') {
        console.log('✅ Login successful!');
        this.snackBar.open('Connexion réussie !', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/shop']);
      } else {
        console.log('❌ Invalid credentials');
        this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
        this.snackBar.open('Identifiants invalides', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }

      this.loading = false;
    }, 500);
  }
}