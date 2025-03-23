import type { FC } from 'react';
import React from 'react';
import { Textarea } from '../../../shared/textarea';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProductFormData } from './type';
import { useTranslation } from 'react-i18next';

export const DescriptionField: FC<FormProps<ProductFormData>> = ({ control }) => {
  const { t } = useTranslation();
  const { field, fieldState, formState } = useController({
    name: 'description',
    control,
    rules: {
      required: t('translation:thisIsRequired'),
      maxLength: {
        value: 1000,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: t('translation:thisInputExceedMaxLength', { maxLength: 1000 }),
      },
    },
  });

  return (
    <Textarea
      label={t('translation:descritption')}
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
