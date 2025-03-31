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
      <small>paste email with contains &#39;admin&#39; for role ADMIN, for example <code>admin@mail.com</code></small>
      <EmailField control={control} />
      <PasswordField control={control} />
    </div>
  );
};
