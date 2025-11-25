import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-step-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center gap-4 mb-8">
      <div *ngFor="let step of steps; let i = index" class="flex items-center">
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center font-bold transition"
          [ngClass]="{
            'bg-blue-600 text-white': currentStep === i + 1,
            'bg-green-600 text-white': currentStep > i + 1,
            'bg-gray-300 text-gray-600': currentStep < i + 1
          }"
        >
          <span *ngIf="currentStep <= i + 1">{{ i + 1 }}</span>
          <span *ngIf="currentStep > i + 1">✓</span>
        </div>
        <div class="ml-2 mr-4">
          <div class="font-semibold">{{ step.title }}</div>
          <div class="text-sm text-gray-600">{{ step.description }}</div>
        </div>
        <div *ngIf="i < steps.length - 1" class="w-16 h-1 bg-gray-300 mx-4"></div>
      </div>
    </div>
  `
})
export class CheckoutStepIndicatorComponent {
  @Input() currentStep = 1;
  
  steps = [
    { title: 'Panier', description: 'Vérifiez vos articles' },
    { title: 'Livraison', description: 'Adresse de livraison' },
    { title: 'Confirmation', description: 'Validation finale' }
  ];
}

// Story
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<CheckoutStepIndicatorComponent> = {
  title: 'Shop/CheckoutStepIndicator',
  component: CheckoutStepIndicatorComponent,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<CheckoutStepIndicatorComponent>;

export const Step1: Story = {
  args: {
    currentStep: 1
  }
};

export const Step2: Story = {
  args: {
    currentStep: 2
  }
};

export const Step3: Story = {
  args: {
    currentStep: 3
  }
};

