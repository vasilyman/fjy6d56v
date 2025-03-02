import type { FC } from 'react';
import React from 'react';
import { Input } from '../../../shared/input';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProductFormData } from './type';

export const TitleField: FC<FormProps<ProductFormData>> = ({ control }) => {
  const { field, fieldState, formState } = useController({
    name: 'title',
    control,
    rules: {
      required: 'This is required',
      pattern: {
        value: /^[\w\s-]*$/i,
        message: 'Dont use special chars',
      },
      maxLength: {
        value: 100,
        message: 'This input exceed maxLength 100',
      },
    },
  });

  return (
    <Input
      label="Title"
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
