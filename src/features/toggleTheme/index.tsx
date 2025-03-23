import React, { FC, useContext } from 'react';
import { ThemeContext } from '../../app/theme';
import clsx from 'clsx';
import $style from './style.module.scss';
import { Icon } from 'src/shared';

export type ToggleTheme = {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export const ToggleTheme: FC<ToggleTheme> = ({ className }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const toggleClassName = clsx(
    className,
    $style['toggle-theme'],
    theme === 'dark' ? $style['toggle-theme_active'] : ''
  );

  return (
    <button className={toggleClassName} type="button" onClick={toggleTheme}>
      <Icon name={theme === 'dark' ? 'lightbulb' : 'moon'} className={$style['toggle-theme__icon']} />
    </button>
  );
};
