import type { Meta } from '@storybook/react';
import { Modal } from '../shared';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    visible: false,
    children: 'Hello world!',
  },
};

export default meta;

export const Default = {
  args: {},
};
