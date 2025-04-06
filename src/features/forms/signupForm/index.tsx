import React from 'react';
import { EmailField } from '../common/emailField';
import { PasswordField } from '../common/passwordField';
import $style from './style.module.scss';
import type { SignupFormData } from './type';
import { Control } from 'react-hook-form';

export const SignupForm = ({ control }: { control: Control<SignupFormData> }) => {
  return (
    <div className={$style['signup-form']}>
      <EmailField control={control} name="email" />
      <PasswordField control={control} name="password" />
    </div>
  );
};
