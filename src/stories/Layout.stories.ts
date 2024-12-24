import type { Meta } from '@storybook/react';
import { Layout } from '../shared';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  args: {
    children: 'Hello world!',
  },
};

export default meta;

export const Default = {
  args: {},
};
