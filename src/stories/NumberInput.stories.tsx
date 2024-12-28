import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { NumberInput } from '../shared';
import React from 'react';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  render: function Component(args) {
    const [{ value }, updateArgs] = useArgs();
    return <NumberInput {...args} onInput={(v) => updateArgs({ value: v })} value={value} />;
  },
  args: {
    value: 0,
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {},
};
