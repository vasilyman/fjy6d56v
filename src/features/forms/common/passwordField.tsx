import React from 'react';
import { Input } from '../../../shared/input';
import { FormProps } from '../types';
import { FieldValues, useController } from 'react-hook-form';

export const PasswordField = <T extends FieldValues>({ control, name }: FormProps<T>) => {
  const { field, fieldState, formState } = useController({
    name,
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
