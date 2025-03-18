import type { FC } from 'react';
import React from 'react';
import { Input } from '../../../shared/input';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProductFormData } from './type';
import { useTranslation } from 'react-i18next';

export const TitleField: FC<FormProps<ProductFormData>> = ({ control }) => {
  const { t } = useTranslation();
  const { field, fieldState, formState } = useController({
    name: 'title',
    control,
    rules: {
      required: t('translation:thisIsRequired'),
      pattern: {
        value: /^[\w\s-]*$/i,
        message: t('translation:dontUseSpecialChars'),
      },
      maxLength: {
        value: 100,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: t('translation:thisInputExceedMaxLength', { maxLength: 100 }),
      },
    },
  });

  return (
    <Input
      label={t('translation:productTitle')}
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
