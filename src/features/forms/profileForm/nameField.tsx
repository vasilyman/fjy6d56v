import type { FC } from 'react';
import React from 'react';
import { Input } from '../../../shared/input';
import { Controller } from 'react-hook-form';
import { FormProps } from '../types';
import type { ProfileFormData } from './type';
import { useTranslation } from 'react-i18next';

export const NameField: FC<FormProps<ProfileFormData>> = ({ control }) => {
  const { t } = useTranslation();
  return (
    <Controller
      control={control}
      rules={{
        required: t('translation:thisIsRequired'),
        pattern: {
          value: /^[\w\s-]*$/i,
          message: t('translation:dontUseSpecialChars'),
        },
        maxLength: {
          value: 100,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          message: t('thisInputExceedMaxLength', { maxLength: '100' }),
        },
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error }, formState: { isSubmitting } }) => (
        <Input
          label={t('translation:firstName')}
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
