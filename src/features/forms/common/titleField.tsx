import React from 'react';
import { Input } from '../../../shared/input';
import { FieldValues, useController } from 'react-hook-form';
import { FormProps } from '../types';
import { useTranslation } from 'react-i18next';

export const TitleField = <T extends FieldValues>({ control, name, label }: FormProps<T>) => {
  const { t } = useTranslation();
  const { field, fieldState, formState } = useController({
    name,
    control,
    rules: {
      required: t('translation:thisIsRequired'),
      pattern: {
        value: /^[\W\w\s-.]*$/i,
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
      label={label ?? 'Title'}
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
