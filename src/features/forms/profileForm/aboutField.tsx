import type { FC } from 'react';
import React from 'react';
import { Textarea } from '../../../shared/textarea';
import { Controller } from 'react-hook-form';
import { FormProps } from '../types';

export const AboutField: FC<FormProps<{ aboutField?: string }>> = ({ control }) => {
  return (
    <Controller
      control={control}
      rules={{
        required: 'This is required',
        maxLength: {
          value: 1000,
          message: 'This input exceed maxLength 1000',
        },
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error }, formState: { isSubmitting } }) => (
        <Textarea
          label="About"
          value={value}
          error={error?.message}
          disabled={isSubmitting}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
      name="aboutField"
    />
  );
};
