import type { Meta } from '@storybook/react';
import { ProductCard } from '../widgets';

const meta: Meta<typeof ProductCard> = {
  title: 'Widgets/ProductCard',
  component: ProductCard,
  args: {
    sum: 200,
    imgUrl: 'https://placehold.jp/150x150.png',
    title: 'Title',
    description: `Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. 
    Description long very very long. Description long very very long. Description long very very long. `,
  },
};

export default meta;

export const Default = {
  args: {},
};
