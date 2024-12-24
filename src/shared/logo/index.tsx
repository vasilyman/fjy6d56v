import React, { FC } from 'react';
import cn from 'clsx';
import $style from './logo.module.scss';

interface LogoProps {
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Logo: FC<LogoProps> = ({ className }) => {
  return <div className={cn($style['logo'], className)}>Panda</div>;
};
