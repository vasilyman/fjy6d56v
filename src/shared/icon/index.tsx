import React, { FC } from 'react';
import cn from 'clsx';
import $style from './icon.module.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';

export type TIcon = 'xmark' | 'bars' | 'moon' | 'lightbulb' | 'cart-shopping' | 'user' | 'edit' | 'trash' | 'list';
export type TIconSize = '16' | '24' | '32';

interface IconProps {
  name: TIcon;
  bold?: boolean;
  className?: string;
  size?: TIconSize;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Icon: FC<IconProps> = ({ className, name, size, onClick }) => {
  const iconClass = `fa-solid fa-${name}`;
  const iconSizeClassMap: Record<TIconSize, string> = {
    '16': '',
    '24': 'fa-xl',
    '32': 'fa-2xl',
  };

  return <i className={cn($style['icon'], className, iconClass, iconSizeClassMap[size])} onClick={onClick} />;
};
