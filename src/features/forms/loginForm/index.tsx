import React from 'react';
import { EmailField } from '../common/emailField';
import { PasswordField } from '../common/passwordField';
import $style from './style.module.scss';
import type { LoginFormData } from './type';
import { Control } from 'react-hook-form';

export const LoginForm = ({ control }: { control: Control<LoginFormData> }) => {
  return (
    <div className={$style['login-form']}>
      <small>
        paste email with contains &#39;admin&#39; for role ADMIN, for example <code>admin@mail.com</code>
      </small>
      <EmailField control={control} name="email" />
      <PasswordField control={control} name="password" />
    </div>
  );
};
