import type { Meta } from '@storybook/react';
import { OperationFull } from '../widgets';

const meta: Meta<typeof OperationFull> = {
  title: 'Widgets/OperationFull',
  component: OperationFull,
  args: {
    sum: 200,
    type: 'Type',
    title: 'Title',
    description: `Description long very very long. Description long very very long. Description long very very long. Description long
    very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. `,
    date: new Date(),
  },
};

export default meta;

export const Default = {
  args: {},
};
