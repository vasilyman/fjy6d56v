import type { Meta } from '@storybook/react';
import { OperationShort } from '../widgets';

const meta: Meta<typeof OperationShort> = {
  title: 'Widgets/OperationShort',
  component: OperationShort,
  args: {
    sum: 200,
    type: 'Type',
    title: 'Title',
    description: `Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. 
    Description long very very long. Description long very very long. Description long very very long. `,
  },
};

export default meta;

export const Default = {
  args: {},
};
