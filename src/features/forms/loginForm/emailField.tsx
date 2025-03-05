import type { FC } from 'react';
import React from 'react';
import { Input } from '../../../shared/input';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { LoginFormData } from './type';

export const EmailField: FC<FormProps<LoginFormData>> = ({ control }) => {
  const { field, fieldState, formState } = useController({
    name: 'email',
    control,
    rules: {
      required: 'This is required',
      pattern: {
        value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/i,
        message: 'Email is invalid',
      },
      maxLength: {
        value: 100,
        message: 'This input exceed maxLength 100',
      },
    },
  });

  return (
    <Input
      label="Email"
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
