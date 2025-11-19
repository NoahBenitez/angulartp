// src/app/components/products-list/products-list.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { ProductsListComponent } from './products-list.component';

const meta: Meta<ProductsListComponent> = {
  component: ProductsListComponent,
  title: 'Shop/Products List',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    products: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<ProductsListComponent>;

const sampleProducts = [
  {
    id: 1,
    name: 'Stylo Bleu',
    price: 2.5,
    created_at: '2025-01-10T10:00:00Z',
    avgRating: 4.2,
  },
  {
    id: 2,
    name: 'Cahier A4',
    price: 5.99,
    created_at: '2025-01-12T14:30:00Z',
    avgRating: 4.5,
  },
  {
    id: 3,
    name: 'Gomme',
    price: 1.25,
    created_at: '2025-01-08T09:15:00Z',
    avgRating: 3.8,
  },
  {
    id: 4,
    name: 'Règle 30cm',
    price: 3.5,
    created_at: '2025-01-15T11:45:00Z',
    avgRating: 4.7,
  },
];

export const Default: Story = {
  args: {
    products: sampleProducts,
    title: 'All Products',
  },
};

export const EmptyList: Story = {
  args: {
    products: [],
    title: 'No Products Available',
  },
};

export const SingleProduct: Story = {
  args: {
    products: [sampleProducts[0]],
    title: 'Featured Product',
  },
};

export const ManyProducts: Story = {
  args: {
    products: [
      ...sampleProducts,
      {
        id: 5,
        name: 'Calculatrice',
        price: 15.99,
        created_at: '2025-01-16T13:20:00Z',
        avgRating: 4.9,
      },
      {
        id: 6,
        name: 'Compas',
        price: 4.75,
        created_at: '2025-01-14T10:30:00Z',
        avgRating: 4.1,
      },
    ],
    title: 'Popular Products',
  },
};

export const NoTitle: Story = {
  args: {
    products: sampleProducts,
  },
};