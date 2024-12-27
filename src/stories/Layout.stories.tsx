import type { Meta } from '@storybook/react';
import { Layout } from '../shared';
import React from 'react';

const children = () => <main style={{ height: '2000px' }}>Hello world!</main>;

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  args: {
    children: children(),
  },
};

export default meta;

export const Default = {
  args: {},
};
