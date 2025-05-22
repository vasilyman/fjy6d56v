import React from 'react';
import { Input } from '../../../shared/input';
import { FieldValues, useController } from 'react-hook-form';
import { FormProps } from '../types';
import { useTranslation } from 'react-i18next';

export const ImageField = <T extends FieldValues>({ control, name }: FormProps<T>) => {
  const { t } = useTranslation();
  const { field, fieldState, formState } = useController({
    name,
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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const errNotAllowedMessage = t('translation:isNotImage', { allowed: 'png, jpg, jpeg, webp' });

        return val === '' ? true : !isUrl ? t('translation:isNotCorrectUrl') : !isImage ? errNotAllowedMessage : true;
      },
    },
  });

  return (
    <Input
      label={t('translation:imageUrl')}
      value={field.value}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
