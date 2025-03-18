import type { FC } from 'react';
import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileForm } from '../forms/profileForm';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import type { ProfileFormData } from '../forms/profileForm/type';
import { useTranslation } from 'react-i18next';

export const EditProfile: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      nameField: 'initial value',
      aboutField: 'initial value',
    },
    mode: 'all',
  });

  const onSubmit = async (data: ProfileFormData) => {
    const res = await new Promise((res) => {
      setTimeout(() => {
        res(data);
      }, 1000);
    });
    console.log(res);
  };

  const { t } = useTranslation();

  return (
    <div className={$style['edit-profile']}>
      <ProfileForm control={control} />
      <Button label={t('translation:save')} block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
    </div>
  );
};

export const EditProfileMemo = memo(EditProfile);
