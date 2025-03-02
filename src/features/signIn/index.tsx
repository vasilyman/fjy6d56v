import type { FC } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../forms/loginForm';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import type { LoginFormData } from '../forms/loginForm/type';

export const SignIn: FC = () => {
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

  const onSubmit = async (data: LoginFormData) => {
    const res = await new Promise((res) => {
      setTimeout(() => {
        res(data);
      }, 1000);
    });
    console.log(res);

    reset();
  };

  return (
    <div className={$style['sign-in']}>
      <LoginForm control={control} />
      <Button label="Войти" block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
    </div>
  );
};
