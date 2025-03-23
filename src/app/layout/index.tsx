import React, { FC } from 'react';
import { Header } from '../../widgets/header';
import { Outlet } from 'react-router';

export const Layout: FC = () => {
  return (
    <>
      <Header sticky={true} />
      <Outlet />
    </>
  );
};
