import type { Meta } from '@storybook/react';
import { Input } from '../shared';
import React from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  component: Input,
  args: {},
};

export default meta;

export const Default = {
  args: {},
};
