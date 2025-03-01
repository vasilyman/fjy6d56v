import type { Meta } from '@storybook/react';
import { Popover } from '../shared/popover';
import React, { FC } from 'react';

const PopoverExample: FC = ({ showOnHover }: { showOnHover: boolean }) => {
  return (
    <>
      <Popover showOnHover={showOnHover}>
        <Popover.Activator>Hover me</Popover.Activator>
        <Popover.Content>Content text</Popover.Content>
      </Popover>
    </>
  );
};

const meta: Meta<typeof PopoverExample> = {
  title: 'Widgets/Popover',
  component: PopoverExample,
  decorators: [
    (Story) => (
      <div style={{ minHeight: '3000px', padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    showOnHover: true,
  },
};

export const Click = {
  args: {
    showOnHover: false,
  },
};
