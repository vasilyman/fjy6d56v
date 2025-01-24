import React, { createContext, FC, PropsWithChildren, useState } from 'react';
import $style from './style.module.scss';

type TFieldStyleModule = typeof $style;

type FieldContextType = {
  fieldStyleModule: TFieldStyleModule;
  setFieldStyleModule: (s: TFieldStyleModule) => void;
};

export const FieldContext = createContext<FieldContextType>(null);

export const FieldProvider = ({ children }: PropsWithChildren) => {
  const [fieldStyleModule, setFieldStyleModule] = useState<TFieldStyleModule>($style);
  return <FieldContext.Provider value={{ fieldStyleModule, setFieldStyleModule }}>{children}</FieldContext.Provider>;
};

export const Field: FC<PropsWithChildren> = ({ children }) => {
  return <FieldProvider>{children}</FieldProvider>;
};
