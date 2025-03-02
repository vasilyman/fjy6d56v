import type { Meta, StoryObj } from '@storybook/react';
import { SignIn } from '../../features/signIn';
import React from 'react';

const meta: Meta<typeof SignIn> = {
  title: 'Features/SignIn',
  decorators: [
    (Story) => (
      <div style={{ width: '300px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  component: SignIn,
  args: {
    count: 0,
  },
};

export default meta;
type Story = StoryObj<typeof SignIn>;

export const Default: Story = {
  args: {},
};
