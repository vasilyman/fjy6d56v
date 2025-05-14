import React from 'react';
import { Textarea } from '../../../shared/textarea';
import { FieldValues, useController } from 'react-hook-form';
import { FormProps } from '../types';
import { useTranslation } from 'react-i18next';

export const AboutField = <T extends FieldValues>({ control, name }: FormProps<T>) => {
  const { t } = useTranslation();
  const { field, fieldState, formState } = useController({
    name,
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
      disabled
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
