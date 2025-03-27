import type { Meta } from '@storybook/react';
import { ProductView } from '../widgets';
import React from 'react';
import { EProductType } from 'src/entities/productType';

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
    type: EProductType.CAR,
    description: `Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. 
    Description long very very long. Description long very very long. Description long very very long. `,
  },
};

export default meta;

export const Default = {
  args: {},
};
