import type { Meta, StoryObj } from '@storybook/react';
import { AddToCard } from '../../features';
import React from 'react';

const meta: Meta<typeof AddToCard> = {
  title: 'Features/AddToCard',
  component: AddToCard,
  render: function Component(args) {
    return <AddToCard {...args} />;
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof AddToCard>;

export const Default: Story = {
  args: {},
};
