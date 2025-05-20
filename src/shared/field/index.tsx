import React, { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import $style from './style.module.scss';

type TFieldStyleModule = typeof $style;

type FieldContextType = {
  fieldStyleModule: TFieldStyleModule;
  setFieldStyleModule: (s: TFieldStyleModule) => void;
};

export const FieldContext = createContext<FieldContextType>(null);

export const FieldProvider = ({ children }: PropsWithChildren) => {
  const [fieldStyleModule, setFieldStyleModule] = useState<TFieldStyleModule>($style);
  return (
    <FieldContext.Provider value={{ fieldStyleModule, setFieldStyleModule }}>
      <div className={fieldStyleModule['field']}>{children}</div>
    </FieldContext.Provider>
  );
};

export const Field: FC<PropsWithChildren> = ({ children }) => {
  return <FieldProvider>{children}</FieldProvider>;
};

export type MessageProps = {
  messages?: string[];
};

export const MessagesElement: FC<MessageProps> = ({ messages }) => {
  return <>{messages?.length > 0 && messages.map((message, i) => <p key={i}>{message}</p>)}</>;
};

export type ErrorProps = {
  error?: string;
};

export const ErrorElement: FC<ErrorProps> = ({ error }) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return !!error && <p className={fieldStyleModule['field__error']}>{error}</p>;
};

export type LabelProps = {
  label?: string;
};

export const LabelElement: FC<LabelProps> = ({ label }) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return !!label && <label className={fieldStyleModule['field__label']}>{label}</label>;
};
