import React, { FC } from 'react';
import $style from './header.module.scss';
import cn from 'clsx';
import { Logo } from '../logo';
import { Icon } from '../icon';
import { ToggleTheme, SelectLang } from '../../features';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  children?: React.ReactNode;
  sticky?: boolean;
}
/**
 * Primary UI component for user interaction
 */
export const Header: FC<HeaderProps> = ({ children, sticky }) => {
  const { t } = useTranslation();
  return (
    <header className={cn($style['header'], { [$style['header_sticky']]: sticky })}>
      <Logo className={$style['header__logo']} />
      <div className={cn($style['header__menu'], $style['menu'])}>
        <Icon name="bars" className={$style['menu__icon']} />
      </div>
      <div className={$style['header__content']}>{children}</div>
      {t('lang')}: <SelectLang className={$style['header__select-lang']} />
      {t('theme')}: <ToggleTheme className={$style['header__theme-toggler']} />
    </header>
  );
};
