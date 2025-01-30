import React, { FC, PropsWithChildren } from 'react';
import { Header } from '../../shared/header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header sticky={true} />
      {children}
    </>
  );
};
