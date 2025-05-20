import React, { FC } from 'react';
import { Header } from '../../widgets/header';
import { Outlet } from 'react-router';
import { Sidebar } from 'src/shared/sidebar';

type Props = {
  sidebarContent?: React.ReactNode;
};

export const LayoutAdmin: FC<Props> = ({ sidebarContent }) => {
  return (
    <div style={{ display: 'grid', gridTemplate: '"header header" auto "aside main" / 16rem 1fr' }}>
      <Header style={{ gridArea: 'header' }} sticky={true} />
      <Sidebar style={{ gridArea: 'aside' }}>{sidebarContent}</Sidebar>
      <main style={{ gridArea: 'main' }}>
        <Outlet />
      </main>
    </div>
  );
};
