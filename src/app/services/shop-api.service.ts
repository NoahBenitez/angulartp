// src/app/services/shop-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse, ProductRating, ProductsFilters } from '../state/products/products.actions';

interface LoginResponse {
  access: string;
  refresh: string;
}

interface RefreshResponse {
  access: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShopApiService {
  private readonly baseUrl = '/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/token/`, {
      username,
      password
    });
  }

  refresh(refreshToken: string): Observable<RefreshResponse> {
    return this.http.post<RefreshResponse>(`${this.baseUrl}/auth/token/refresh/`, {
      refresh: refreshToken
    });
  }

  getProducts(filters: ProductsFilters): Observable<ProductsResponse> {
    let params = new HttpParams();
    
    if (filters.page) {
      params = params.set('page', filters.page.toString());
    }
    if (filters.page_size) {
      params = params.set('page_size', filters.page_size.toString());
    }
    if (filters.min_rating) {
      params = params.set('min_rating', filters.min_rating.toString());
    }
    if (filters.ordering) {
      params = params.set('ordering', filters.ordering);
    }

    return this.http.get<ProductsResponse>(`${this.baseUrl}/products/`, { params });
  }

  getRating(id: number): Observable<ProductRating> {
    return this.http.get<ProductRating>(`${this.baseUrl}/products/${id}/rating/`);
  }
}