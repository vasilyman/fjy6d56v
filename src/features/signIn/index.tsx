import type { FC } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../forms/loginForm';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import type { LoginFormData } from '../forms/loginForm/type';
import { fetchTokens } from 'src/entities/token/store';
import { useAppDispatch } from 'src/app/store';
import { useTranslation } from 'react-i18next';

type SignInProps = {
  onSuccess?: () => void;
};

export const SignIn: FC<SignInProps> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const getTokens = (username: string, password: string) => {
    return dispatch(fetchTokens({ username, password }));
  };

  const onLogin = async (username: string, password: string) => {
    return getTokens(username, password);
  };

  const onSubmit = async (data: LoginFormData) => {
    await onLogin(data.email, data.password);
    reset();
    if (onSuccess) onSuccess();
  };

  return (
    <div className={$style['sign-in']}>
      <h3>{t('translation:signInTitle')}</h3>
      <LoginForm control={control} />
      <Button label="Войти" block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
    </div>
  );
};
