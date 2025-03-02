import type { FC } from 'react';
import React from 'react';
import { Textarea } from '../../../shared/textarea';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProductFormData } from './type';

export const DescriptionField: FC<FormProps<ProductFormData>> = ({ control }) => {
  const { field, fieldState, formState } = useController({
    name: 'description',
    control,
    rules: {
      required: 'This is required',
      maxLength: {
        value: 1000,
        message: 'This input exceed maxLength 1000',
      },
    },
  });

  return (
    <Textarea
      label="Description"
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
