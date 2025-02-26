import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from '../shared/rangeSlider';
import React from 'react';

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  decorators: [
    (Story) => (
      <div style={{ width: '300px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: [10, 70],
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

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
    value: 0,
    step: 1,
  },
};
