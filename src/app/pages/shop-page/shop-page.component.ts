import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="shop-container">
      <h1>Bienvenue sur la boutique !</h1>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Client</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of products">
            <td>{{item.name}}</td>
            <td>{{item.price | currency}}</td>
            <td>{{item.quantity}}</td>
            <td>{{item.customer}}</td>
            <td>
              <span class="stars">
                <ng-container *ngFor="let star of [1,2,3,4,5]; let i = index">
                  <span
                    class="star"
                    [class.filled]="i < item.rating"
                    (click)="setRating(item, i + 1)">
                    ★
                  </span>
                </ng-container>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .shop-container {
      max-width: 900px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #1976d2;
      color: white;
    }
    tr:hover { background-color: #f1f1f1; }

    .stars {
      display: flex;
      gap: 2px;
      cursor: pointer;
    }
    .star {
      font-size: 20px;
      color: #ccc;
      transition: color 0.2s;
    }
    .star.filled {
      color: #ffca28; /* jaune pour les étoiles */
    }
    .star:hover {
      color: #ffc107;
    }
  `]
})
export class ShopPageComponent {
  products = [
    { name: 'Produit A', price: 19.99, quantity: 2, customer: 'Noah', rating: 3 },
    { name: 'Produit B', price: 49.5, quantity: 1, customer: 'Alice', rating: 4 },
    { name: 'Produit C', price: 15, quantity: 5, customer: 'Bob', rating: 2 },
    { name: 'Produit D', price: 99.99, quantity: 1, customer: 'Noah', rating: 5 },
  ];

  setRating(item: any, rating: number) {
    item.rating = rating;
  }
}
