import type { FC } from 'react';
import React from 'react';
import { FormProps } from '../types';
import { AboutField } from './aboutField';
import { NameField } from './nameField';
import $style from './style.module.scss';
import type { ProfileFormData } from './type';

export const ProfileForm: FC<FormProps<ProfileFormData>> = ({ control }) => {
  return (
    <div className={$style['profile-form']}>
      <NameField control={control} />
      <AboutField control={control} />
    </div>
  );
};
