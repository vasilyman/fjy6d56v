import type { Meta, StoryObj } from '@storybook/react';
import { NameField } from '../../../features/forms/profileForm/nameField';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileFormData } from 'src/features/forms/profileForm/type';

const Component: FC = () => {
  const { control } = useForm<ProfileFormData>({
    defaultValues: {
      nameField: 'initial value',
    },
    mode: 'all',
  });

  return <NameField control={control} />;
};

const meta: Meta<typeof NameField> = {
  title: 'Forms/ProfileForm/NameField',
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  component: Component,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {},
};
