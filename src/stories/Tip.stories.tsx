import type { Meta } from '@storybook/react';
import { Tip } from '../shared/tip';
import React from 'react';

const meta: Meta<typeof Tip> = {
  title: 'Widgets/Tip',
  component: Tip,
  decorators: [
    (Story) => (
      <div style={{ minHeight: '3000px', padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
  render: function Render(args) {
    return (
      <>
        Lorem ispum text <Tip {...args}>suggestion</Tip> lorem ispum text.
      </>
    );
  },
  args: {
    text: 'Tooltip text',
  },
};

export default meta;

export const Default = {
  args: {},
};

export const Click = {
  args: {
    openOnClick: true,
  },
};
