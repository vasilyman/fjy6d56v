import type { Meta } from '@storybook/react';
import { ProductList } from '../widgets/productList';
import React from 'react';

const meta: Meta<typeof ProductList> = {
  title: 'Widgets/ProductList',
  component: ProductList,
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    manualLoading: false,
  },
};

export default meta;

export const Default = {
  args: {
    manualLoading: true,
  },
};

export const AutoLoading = {
  args: {},
};
