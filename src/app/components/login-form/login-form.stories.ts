// src/app/components/login-form/login-form.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent } from './login-form.component';

const meta: Meta<LoginFormComponent> = {
  component: LoginFormComponent,
  title: 'Shop/Login Form',
  tags: ['autodocs'],
  argTypes: {
    submitLogin: { 
      action: 'submitLogin',
      description: 'Emitted when user submits the login form'
    },
  },
};

export default meta;
type Story = StoryObj<LoginFormComponent>;

export const Default: Story = {};

export const WithInteraction: Story = {
  play: async ({ canvasElement }) => {
    console.log('Login form rendered');
  },
};