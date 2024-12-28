import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { AddToCard } from '../features';
import React from 'react';

const meta: Meta<typeof AddToCard> = {
  title: 'Features/AddToCard',
  component: AddToCard,
  render: function Component(args) {
    const [{ count }, updateArgs] = useArgs();
    return <AddToCard {...args} onUpdateCount={(v) => updateArgs({ count: v })} count={count} />;
  },
  args: {
    count: 0,
  },
};

export default meta;
type Story = StoryObj<typeof AddToCard>;

export const Default: Story = {
  args: {},
};
