import type { Meta, StoryObj } from '@storybook/react';
import { EditProfile } from '../../features/editProfile';
import React from 'react';

const meta: Meta<typeof EditProfile> = {
  title: 'Features/EditProfile',
  decorators: [
    (Story) => (
      <div style={{ width: '300px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  component: EditProfile,
  args: {
    count: 0,
  },
};

export default meta;
type Story = StoryObj<typeof EditProfile>;

export const Default: Story = {
  args: {},
};
