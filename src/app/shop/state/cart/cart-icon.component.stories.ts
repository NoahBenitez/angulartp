import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { CartIconComponent } from './cart-icon.component';

const meta: Meta<CartIconComponent> = {
  title: 'Shop/CartIcon',
  component: CartIconComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        provideMockStore({
          initialState: {
            cart: { items: [], totalPrice: 0, count: 0 }
          }
        })
      ]
    })
  ]
};

export default meta;
type Story = StoryObj<CartIconComponent>;

export const EmptyCart: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        provideMockStore({
          initialState: {
            cart: { items: [], totalPrice: 0, count: 0 }
          }
        })
      ]
    })
  ]
};

export const WithItems: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        provideMockStore({
          initialState: {
            cart: {
              items: [
                { id: 1, name: 'Laptop', price: 1299, quantity: 1 },
                { id: 2, name: 'Mouse', price: 49, quantity: 2 }
              ],
              totalPrice: 1397,
              count: 3
            }
          }
        })
      ]
    })
  ]
};

export const ManyItems: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        provideMockStore({
          initialState: {
            cart: {
              items: Array.from({ length: 5 }, (_, i) => ({
                id: i,
                name: `Product ${i}`,
                price: 99,
                quantity: 2
              })),
              totalPrice: 990,
              count: 10
            }
          }
        })
      ]
    })
  ]
};
