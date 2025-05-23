import type { Meta } from '@storybook/react';
import { CartItem } from '../widgets';
import React from 'react';

const meta: Meta<typeof CartItem> = {
  title: 'Widgets/CartItem',
  component: CartItem,
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
  },
};

export default meta;

export const Default = {
  args: {},
};
