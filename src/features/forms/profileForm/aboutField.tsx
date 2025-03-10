import type { FC } from 'react';
import React from 'react';
import { Textarea } from '../../../shared/textarea';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProfileFormData } from './type';

export const AboutField: FC<FormProps<ProfileFormData>> = ({ control }) => {
  const { field, fieldState, formState } = useController({
    name: 'aboutField',
    control,
    rules: {
      maxLength: {
        value: 1000,
        message: 'This input exceed maxLength 1000',
      },
    },
  });

  return (
    <Textarea
      label="About"
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
