import type { FC } from 'react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../forms/loginForm';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import type { LoginFormData } from '../forms/loginForm/type';
import { authActions } from 'src/entities/auth/store';
import { useAppDispatch } from 'src/app/store';
import { useTranslation } from 'react-i18next';
import { SignupForm } from '../forms/signupForm';
import { SignupFormData } from '../forms/signupForm/type';
import { ServerErrors } from 'src/entities/apiError/type';

type SignInProps = {
  onSuccess?: () => void;
};

export const SignIn: FC<SignInProps> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setError,
  } = useForm<LoginFormData | SignupFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const { t } = useTranslation();

  type TFormType = 'signin' | 'signup';
  const [formType, setFormType] = useState<TFormType>('signin');

  const dispatch = useAppDispatch();
  const getTokens = (username: string, password: string) => {
    return dispatch(authActions.fetchTokens({ username, password }));
  };
  const signup = (username: string, password: string) => {
    return dispatch(authActions.signup({ username, password }));
  };

  const onLoginOrSignup = async (username: string, password: string) => {
    return formType === 'signin' ? getTokens(username, password).unwrap() : signup(username, password).unwrap();
  };

  const onSubmit = async (data: LoginFormData) => {
    let errorMessage: string;
    await onLoginOrSignup(data.email, data.password).catch((err?: ServerErrors) => {
      errorMessage = err?.errors?.[0]?.message ?? 'unknown error';
    });

    if (errorMessage) {
      setError('email', {
        type: 'serverError',
        message: errorMessage,
      });
      return;
    }

    reset();
    if (onSuccess) onSuccess();
  };

  const toggleType = (signUp = false) => {
    setFormType(signUp ? 'signup' : 'signin');
  };

  return (
    <div className={$style['sign-in']}>
      <h3>
        <button className={$style['sign-in__button']} onClick={() => toggleType()} disabled={formType === 'signin'}>
          {t('translation:signInTitle')}
        </button>
        /
        <button className={$style['sign-in__button']} onClick={() => toggleType(true)} disabled={formType === 'signup'}>
          {t('translation:signUpTitle')}
        </button>
      </h3>
      {formType === 'signin' ? <LoginForm control={control} /> : <SignupForm control={control} />}
      <Button label="Войти" block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
    </div>
  );
};
