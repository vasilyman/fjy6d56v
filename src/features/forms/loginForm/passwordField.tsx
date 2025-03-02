import type { FC } from 'react';
import React from 'react';
import { Input } from '../../../shared/input';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { LoginFormData } from './type';

export const PasswordField: FC<FormProps<LoginFormData>> = ({ control }) => {
  const { field, fieldState, formState } = useController({
    name: 'password',
    control,
    rules: {
      required: 'This is required',
      minLength: {
        value: 6,
        message: 'This input exceed minLength 6',
      },
      maxLength: {
        value: 100,
        message: 'This input exceed maxLength 100',
      },
    },
  });

  return (
    <Input
      label="Password"
      type="password"
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
