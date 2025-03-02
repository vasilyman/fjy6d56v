import type { Meta, StoryObj } from '@storybook/react';
import { ProfileForm } from '../../../features/forms/profileForm';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileFormData } from 'src/features/forms/profileForm/type';

const Component: FC = () => {
  const { control } = useForm<ProfileFormData>({
    defaultValues: {
      nameField: 'initial value',
      aboutField: 'initial value',
    },
    mode: 'all',
  });

  return <ProfileForm control={control} />;
};

const meta: Meta<typeof ProfileForm> = {
  title: 'Forms/ProfileForm',
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
