// src/app/components/product-card/product-card.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from './product-card.component';

const meta: Meta<ProductCardComponent> = {
  component: ProductCardComponent,
  title: 'Shop/Product Card',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    price: { control: 'number' },
    created_at: { control: 'text' },
    avgRating: { control: { type: 'number', min: 0, max: 5, step: 0.1 } },
  },
  args: {
    name: 'Stylo Bleu',
    price: 2.5,
    created_at: '2025-01-10T10:00:00Z',
    avgRating: 4.2,
  },
};

export default meta;
type Story = StoryObj<ProductCardComponent>;

export const Default: Story = {};

export const ExpensiveProduct: Story = {
  args: {
    name: 'Ordinateur Portable Premium',
    price: 1299.99,
    created_at: '2025-01-15T14:30:00Z',
    avgRating: 4.8,
  },
};

export const LowRating: Story = {
  args: {
    name: 'Produit Économique',
    price: 5.99,
    created_at: '2024-12-01T08:15:00Z',
    avgRating: 2.3,
  },
};

export const NoRating: Story = {
  args: {
    name: 'Nouveau Produit',
    price: 15.0,
    created_at: '2025-01-20T12:00:00Z',
    avgRating: undefined,
  },
};

export const PerfectRating: Story = {
  args: {
    name: 'Produit Exceptionnel',
    price: 49.99,
    created_at: '2025-01-18T16:45:00Z',
    avgRating: 5.0,
  },
};