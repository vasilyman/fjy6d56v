import type { Meta } from '@storybook/react';
import { Header } from '../shared';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  args: {
    children: 'Hello world!',
  },
};

export default meta;

export const Default = {
  args: {},
};
