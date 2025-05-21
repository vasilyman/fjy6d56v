import React, { FC } from 'react';
import { Header } from '../../widgets/header';
import { Outlet } from 'react-router';
import { Sidebar } from 'src/shared/sidebar';
import $style from './admin.module.scss';

type Props = {
  sidebarContent?: React.ReactNode;
};

export const LayoutAdmin: FC<Props> = ({ sidebarContent }) => {
  return (
    <div className={$style['layout']}>
      <Header style={{ gridArea: 'header' }} sticky={true} />
      <Sidebar style={{ gridArea: 'aside' }}>{sidebarContent}</Sidebar>
      <main style={{ gridArea: 'main' }}>
        <Outlet />
      </main>
    </div>
  );
};
