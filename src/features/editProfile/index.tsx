import type { FC } from 'react';
import React, { memo, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileForm } from '../forms/profileForm';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import type { ProfileFormData } from '../forms/profileForm/type';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { profileActions, profileSelectors } from 'src/entities/profile/store';
import { useAppDispatch } from 'src/app/store';

export const EditProfile: FC = () => {
  const profile = useSelector(profileSelectors.getProfile);
  const profileIsLoading = useSelector(profileSelectors.getIsLoading);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      nameField: profile.firstname ?? '',
      aboutField: profile.about ?? '',
    },
    mode: 'all',
  });

  useEffect(() => {
    if (typeof profile.firstname === 'string' && !profileIsLoading) setValue('nameField', profile.firstname);
    if (typeof profile.about === 'string' && !profileIsLoading) setValue('aboutField', profile.about);
  }, [profile, setValue, profileIsLoading]);

  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (data: ProfileFormData) => {
      const res = await dispatch(
        profileActions.updateProfile({
          firstname: data.nameField,
          about: data.aboutField,
        })
      );
      console.log(data, res);
    },
    [dispatch]
  );

  const { t } = useTranslation();

  return (
    <div className={$style['edit-profile']}>
      <ProfileForm control={control} />
      <Button label={t('translation:save')} block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
    </div>
  );
};

export const EditProfileMemo = memo(EditProfile);
