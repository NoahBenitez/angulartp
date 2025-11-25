import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './cart.actions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div class="text-6xl text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        {{ product.image }}
      </div>
      <div class="p-4">
        <h3 class="font-bold text-xl mb-2">{{ product.name }}</h3>
        <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>
        
        <div class="flex items-center gap-2 mb-3">
          <span class="text-sm" [ngClass]="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
            📦 {{ product.stock > 0 ? product.stock + ' en stock' : 'Rupture de stock' }}
          </span>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-blue-600">{{ product.price }}€</span>
          <div class="flex gap-2">
            <button
              (click)="viewDetails.emit()"
              class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Détails
            </button>
            <button
              (click)="addToCart.emit()"
              [disabled]="product.stock === 0"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<void>();
  @Output() viewDetails = new EventEmitter<void>();
}

// Story pour ProductCard
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ProductCardComponent> = {
  title: 'Shop/ProductCard',
  component: ProductCardComponent,
  tags: ['autodocs'],
  argTypes: {
    addToCart: { action: 'added to cart' },
    viewDetails: { action: 'view details clicked' }
  }
};

export default meta;
type Story = StoryObj<ProductCardComponent>;

export const InStock: Story = {
  args: {
    product: {
      id: 1,
      name: 'Laptop Pro',
      price: 1299,
      image: '💻',
      description: 'Ordinateur portable haute performance',
      stock: 5
    }
  }
};

export const LowStock: Story = {
  args: {
    product: {
      id: 2,
      name: 'Smartphone X',
      price: 899,
      image: '📱',
      description: 'Dernier smartphone avec écran OLED',
      stock: 1
    }
  }
};

export const OutOfStock: Story = {
  args: {
    product: {
      id: 5,
      name: 'Tablette',
      price: 599,
      image: '📲',
      description: 'Écran 11 pouces, stylet inclus',
      stock: 0
    }
  }
};

export const Expensive: Story = {
  args: {
    product: {
      id: 7,
      name: 'MacBook Pro M3',
      price: 2999,
      image: '💻',
      description: 'Ordinateur portable professionnel',
      stock: 3
    }
  }
};

export const Affordable: Story = {
  args: {
    product: {
      id: 8,
      name: 'Souris Gaming',
      price: 49,
      image: '🖱️',
      description: 'Souris ergonomique haute précision',
      stock: 50
    }
  }
};

