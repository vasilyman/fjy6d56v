import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '../shared';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  args: {
    value: 0,
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {},
};
