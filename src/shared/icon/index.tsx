import React, { FC } from 'react';
import cn from 'clsx';
import $style from './icon.module.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';

export type TIcon = 'xmark' | 'bars';

interface IconProps {
  name: TIcon;
  bold?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Icon: FC<IconProps> = ({ className, name, onClick }) => {
  const iconClass = `fa-solid fa-${name}`;

  return <i className={cn($style['icon'], className, iconClass)} onClick={onClick} />;
};
