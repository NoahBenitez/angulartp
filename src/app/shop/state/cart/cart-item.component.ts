import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from './cart.actions';   // ✅ CORRECT maintenant

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-4 py-4 border-b">
      <div class="text-4xl">{{ item.image }}</div>
      
      <div class="flex-1">
        <h3 class="font-bold text-lg">{{ item.name }}</h3>
        <p class="text-gray-600">{{ item.price }}€</p>
      </div>
      
      <div class="flex items-center gap-2">
        <button (click)="onDecrease()" class="p-1 bg-gray-200 rounded hover:bg-gray-300">➖</button>

        <span class="px-3 py-1 bg-gray-100 rounded font-bold">
          {{ item.quantity }}
        </span>

        <button (click)="onIncrease()" class="p-1 bg-gray-200 rounded hover:bg-gray-300">➕</button>
      </div>
      
      <div class="font-bold text-lg">
        {{ (item.price * item.quantity).toFixed(2) }}€
      </div>
      
      <button (click)="onRemove()" class="p-2 text-red-600 hover:bg-red-50 rounded">
        🗑️
      </button>
    </div>
  `
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() increaseQuantity = new EventEmitter<void>();
  @Output() decreaseQuantity = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  onIncrease() { this.increaseQuantity.emit(); }
  onDecrease() { this.decreaseQuantity.emit(); }
  onRemove()   { this.remove.emit(); }
}
