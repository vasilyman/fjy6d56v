import type { FC } from 'react';
import React from 'react';
import { Textarea } from '../../../shared/textarea';
import { useController } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProfileFormData } from './type';
import { useTranslation } from 'react-i18next';

export const AboutField: FC<FormProps<ProfileFormData>> = ({ control }) => {
  const { t } = useTranslation();
  const { field, fieldState, formState } = useController({
    name: 'aboutField',
    control,
    rules: {
      maxLength: {
        value: 1000,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: t('thisInputExceedMaxLength', { maxLength: '1000' }),
      },
    },
  });

  return (
    <Textarea
      label={t('translation:about')}
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
