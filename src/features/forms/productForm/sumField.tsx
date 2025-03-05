import type { FC } from 'react';
import React from 'react';
import { Input } from '../../../shared/input';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProductFormData } from './type';

export const SumField: FC<FormProps<ProductFormData>> = ({ control }) => {
  const { field, fieldState, formState } = useController({
    name: 'sum',
    control,
    rules: {
      required: 'This is required',
      min: {
        value: 0,
        message: 'This input must be positive or 0',
      },
    },
  });

  return (
    <Input
      label="Sum"
      type="number"
      value={field.value.toString()}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      min={0}
      onBlur={field.onBlur}
      onChange={(v: string) => field.onChange(Number(v))}
    />
  );
};
