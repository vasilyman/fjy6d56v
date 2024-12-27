import React, { FC } from 'react';
import { Header } from '../header';

interface LayoutProps {
  children?: React.ReactNode;
}
/**
 * Primary UI component for user interaction
 */
export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header sticky={true} />
      {children}
    </>
  );
};
