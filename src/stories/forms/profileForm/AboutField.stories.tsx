import type { Meta, StoryObj } from '@storybook/react';
import { AboutField } from '../../../features/forms/profileForm/aboutField';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileFormData } from 'src/features/forms/profileForm/type';

const Component: FC = () => {
  const { control } = useForm<ProfileFormData>({
    defaultValues: {
      aboutField: 'initial value',
    },
    mode: 'all',
  });

  return <AboutField control={control} name="aboutField" />;
};

const meta: Meta<typeof AboutField> = {
  title: 'Forms/ProfileForm/AboutField',
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
