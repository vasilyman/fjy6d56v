import type { Meta, StoryObj } from '@storybook/react';
import { RangeInput } from '../shared/rangeInput';
import React from 'react';

const meta: Meta<typeof RangeInput> = {
  title: 'Components/RangeInput',
  component: RangeInput,
  decorators: [
    (Story) => (
      <div style={{ width: '300px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: [10, 70],
    step: 1,
  },
};

export default meta;
type Story = StoryObj<typeof RangeInput>;

export const Default: Story = {
  args: {},
};

export const Step: Story = {
  args: {
    step: 10,
  },
};

export const Single: Story = {
  args: {
    value: 10,
    max: 1000,
    step: 1,
  },
};
