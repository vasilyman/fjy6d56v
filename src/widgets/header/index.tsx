import React, { FC } from 'react';
import $style from './header.module.scss';
import cn from 'clsx';
import { Logo } from '../../shared/logo';
import { Icon } from '../../shared/icon';
import { ToggleTheme, SelectLang } from '../../features';
import { PersonIcon } from 'src/features/personIcon';
import { CartIcon } from 'src/features/cart';
import { Link } from 'react-router';
import { OrdersIcon } from 'src/features/ordersIcon';
import { AdminIcon } from 'src/features/adminIcon';

interface HeaderProps {
  children?: React.ReactNode;
  sticky?: boolean;
  style?: React.CSSProperties;
}
/**
 * Primary UI component for user interaction
 */
export const Header: FC<HeaderProps> = ({ children, sticky, style }) => {
  return (
    <header style={style} className={cn($style['header'], { [$style['header_sticky']]: sticky })}>
      <Link to="/" className={$style['header__logo']}>
        <Logo />
      </Link>
      <div className={cn($style['header__menu'], $style['menu-button'])}>
        <Icon name="bars" className={$style['menu-button__icon']} />
      </div>
      <div className={$style['header__content']}>{children}</div>
      <SelectLang className={$style['header__select-lang']} />
      <ToggleTheme className={$style['header__theme-toggler']} />
      <div className={cn($style['header__site-menu'], $style['site-menu'])}>
        <PersonIcon />
        <CartIcon />
        <OrdersIcon />
        <AdminIcon />
      </div>
    </header>
  );
};
