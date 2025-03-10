import type { FC } from 'react';
import React from 'react';
import { Input } from '../../../shared/input';
import { Controller } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProfileFormData } from './type';

export const NameField: FC<FormProps<ProfileFormData>> = ({ control }) => {
  return (
    <Controller
      control={control}
      rules={{
        required: 'This is required',
        pattern: {
          value: /^[\w\s-]*$/i,
          message: 'Dont use special chars',
        },
        maxLength: {
          value: 100,
          message: 'This input exceed maxLength 100',
        },
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error }, formState: { isSubmitting } }) => (
        <Input
          label="First name"
          value={value}
          error={error?.message}
          disabled={isSubmitting}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
      name="nameField"
    />
  );
};
