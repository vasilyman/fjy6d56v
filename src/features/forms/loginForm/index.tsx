import type { FC } from 'react';
import React from 'react';
import { FormProps } from '../types';
import { EmailField } from './emailField';
import { PasswordField } from './passwordField';
import $style from './style.module.scss';
import type { LoginFormData } from './type';

export const LoginForm: FC<FormProps<LoginFormData>> = ({ control }) => {
  return (
    <div className={$style['login-form']}>
      <EmailField control={control} />
      <PasswordField control={control} />
    </div>
  );
};
