import React from 'react';
import { Input } from '../../../shared/input';
import { FieldValues, useController } from 'react-hook-form';
import { FormProps } from '../types';

export const EmailField = <T extends FieldValues>({ control, name }: FormProps<T>) => {
  const { field, fieldState, formState } = useController({
    control,
    name,
    rules: {
      // required: 'This is required',
      // pattern: {
      //   value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/i,
      //   message: 'Email is invalid',
      // },
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
