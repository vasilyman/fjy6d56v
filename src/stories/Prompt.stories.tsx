import type { Meta } from '@storybook/react';
import { Prompt } from '../widgets';
import React from 'react';

const meta: Meta<typeof Prompt> = {
  title: 'Widgets/Prompt',
  component: Prompt,
  decorators: [
    (Story) => (
      <div style={{ margin: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {},
};

export default meta;

export const Default = {
  args: {},
};
