import React, { FC } from 'react';
import $style from './header.module.scss';
import cn from 'clsx';
import { Logo } from '../logo';
import { Icon } from '../icon';

interface HeaderProps {
  children?: React.ReactNode;
}
/**
 * Primary UI component for user interaction
 */
export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className={$style['header']}>
      <Logo className={$style['header__logo']} />
      <div className={cn($style['header__menu'], $style['menu'])}>
        <Icon name="bars" className={$style['menu__icon']} />
      </div>
      {children}
    </header>
  );
};
