import React from 'react';
import { Input } from '../../../shared/input';
import { FieldValues, useController } from 'react-hook-form';
import { FormProps } from '../types';
import { useTranslation } from 'react-i18next';

export const SumField = <T extends FieldValues>({ control, name }: FormProps<T>) => {
  const { t } = useTranslation();
  const { field, fieldState, formState } = useController({
    name,
    control,
    rules: {
      required: t('translation:thisIsRequired'),
      min: {
        value: 0,
        message: t('translation:isNotPositiveOrZero'),
      },
    },
  });

  return (
    <Input
      label={t('translation:sum')}
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
