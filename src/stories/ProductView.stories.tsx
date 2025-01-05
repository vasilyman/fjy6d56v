import type { Meta } from '@storybook/react';
import { ProductView } from '../widgets';
import React from 'react';

const meta: Meta<typeof ProductView> = {
  title: 'Widgets/ProductView',
  component: ProductView,
  decorators: [
    (Story) => (
      <div style={{ margin: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    sum: 200,
    imgUrl: 'https://placehold.jp/150x150.png',
    title: 'Title',
    type: 'Product type',
    description: `Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. 
    Description long very very long. Description long very very long. Description long very very long. `,
  },
};

export default meta;

export const Default = {
  args: {},
};
