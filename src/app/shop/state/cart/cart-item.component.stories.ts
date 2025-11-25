import type { Meta, StoryObj } from '@storybook/angular';
import { CartItemComponent } from './cart-item.component';

const meta: Meta<CartItemComponent> = {
  title: 'Shop/CartItem',
  component: CartItemComponent,
  tags: ['autodocs'],
  argTypes: {
    increaseQuantity: { action: 'increased' },
    decreaseQuantity: { action: 'decreased' },
    remove: { action: 'removed' }
  }
};

export default meta;
type Story = StoryObj<CartItemComponent>;

export const Default: Story = {
  args: {
    item: {
      id: 1,
      name: 'Laptop Pro',
      price: 1299,
      image: '💻',
      description: 'Ordinateur portable haute performance',
      stock: 5,
      quantity: 1
    }
  }
};

export const MultipleQuantity: Story = {
  args: {
    item: {
      id: 2,
      name: 'Smartphone X',
      price: 899,
      image: '📱',
      description: 'Dernier smartphone avec écran OLED',
      stock: 12,
      quantity: 3
    }
  }
};

export const ExpensiveItem: Story = {
  args: {
    item: {
      id: 1,
      name: 'Laptop Pro Gaming',
      price: 2499,
      image: '💻',
      description: 'Ordinateur portable gaming ultra puissant',
      stock: 2,
      quantity: 1
    }
  }
};
