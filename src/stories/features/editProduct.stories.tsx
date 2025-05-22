import type { Meta, StoryObj } from '@storybook/react';
import { EditProduct } from '../../features/editProduct';
import React from 'react';

const meta: Meta<typeof EditProduct> = {
  title: 'Features/EditProduct',
  decorators: [
    (Story) => (
      <div style={{ width: '300px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  component: EditProduct,
  args: {
    productId: '0',
  },
};

export default meta;
type Story = StoryObj<typeof EditProduct>;

export const Default: Story = {
  args: {},
};
