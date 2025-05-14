import type { FC } from 'react';
import React, { memo, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileForm } from '../forms/profileForm';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import type { ProfileFormData } from '../forms/profileForm/type';
import { useTranslation } from 'react-i18next';
import { gql, useMutation, useQuery } from '@apollo/client';
import type { Mutation, Query, UpdateProfileInput } from 'src/app/apollo/type';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';

const profileGet = gql`
  query Profile {
    profile {
      id
      name
      email
      signUpDate
      commandId
    }
  }
`;

const profileUpdateMutation = gql`
  mutation Update($input: UpdateProfileInput!) {
    profile {
      update(input: $input) {
        id
        name
        email
        signUpDate
        commandId
      }
    }
  }
`;

export const EditProfile: FC = () => {
  const accessToken = useSelector(authSelectors.getAccess);

  const { data: profile, loading: profileIsLoading } = useQuery<
    Pick<Query, 'profile'>,
    { ids: string[]; limit: number }
  >(profileGet, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    setError,
  } = useForm<ProfileFormData>({
    defaultValues: {
      nameField: profile?.profile.name ?? '',
      aboutField: profile?.profile.email ?? '',
    },
    mode: 'all',
  });

  useEffect(() => {
    if (typeof profile?.profile.name === 'string' && !profileIsLoading) setValue('nameField', profile?.profile.name);
    if (typeof profile?.profile.email === 'string' && !profileIsLoading) setValue('aboutField', profile?.profile.email);
  }, [profile, setValue, profileIsLoading]);

  const [profileUpdate] = useMutation<Mutation['profile']['update'], { input: UpdateProfileInput }>(
    profileUpdateMutation,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const onSubmit = useCallback(
    async (data: ProfileFormData) => {
      profileUpdate({
        variables: {
          input: {
            name: data.nameField,
          },
        },
      }).catch((e) => {
        setError('nameField', e);
      });
    },
    [setError, profileUpdate]
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
