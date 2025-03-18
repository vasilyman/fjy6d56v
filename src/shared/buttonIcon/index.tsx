import type { FC } from 'react';
import React from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { Icon } from 'src/shared';
import { TIcon } from '../icon';
import { useHref, type Path } from 'react-router';
import { VariableHTMLElement } from '../variableHTMLElement';

type TButtonIconAccentColor = 'white' | 'black';

interface Props {
  className?: string;
  children?: React.ReactNode;
  color?: TButtonIconAccentColor;
  icon: TIcon;
  to?: string | Path;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonIcon: FC<Props> = ({ className, children, color, icon, to, onClick }) => {
  const href = useHref(to);

  const is = to ? 'a' : 'button';

  return (
    <VariableHTMLElement
      is={is}
      className={cn($style['button-icon'], className, $style[`button-icon_color-${color}`])}
      type="button"
      href={href}
      onClick={onClick}
    >
      <div className={$style['button-icon__icon']}>
        <Icon name={icon} size="16" />
      </div>
      {children}
    </VariableHTMLElement>
  );
};
