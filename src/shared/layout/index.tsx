import React, { FC } from 'react';
import $style from './layout.module.scss';
import { Header } from '../header';

interface LayoutProps {
  children?: React.ReactNode;
}
/**
 * Primary UI component for user interaction
 */
export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={$style['layout']}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
