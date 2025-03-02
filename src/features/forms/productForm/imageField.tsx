import type { FC } from 'react';
import React from 'react';
import { Input } from '../../../shared/input';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProductFormData } from './type';

export const ImageField: FC<FormProps<ProductFormData>> = ({ control }) => {
  const { field, fieldState, formState } = useController({
    name: 'imgUrl',
    control,
    rules: {
      validate: (val) => {
        let isUrl = false;
        try {
          new URL(val);
          isUrl = true;
        } catch (error) {
          isUrl = false;
        }

        const isImage = /\.(png|jpg|jpeg|webp)$/i.test(val);
        return val === ''
          ? true
          : !isUrl
          ? 'Is not correct url'
          : !isImage
          ? 'Is not image (allowed png, jpg, jpeg, webp)'
          : true;
      },
    },
  });

  return (
    <Input
      label="Image URL"
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
