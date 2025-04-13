import React from 'react';
import { AboutField } from './aboutField';
import { NameField } from './nameField';
import $style from './style.module.scss';
import type { ProfileFormData } from './type';
import { ControlProps } from '../types';

export const ProfileForm = ({ control }: ControlProps<ProfileFormData>) => {
  return (
    <div className={$style['profile-form']}>
      <NameField control={control} name="nameField" />
      <AboutField control={control} name="aboutField" />
    </div>
  );
};
