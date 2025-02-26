import React, { FC } from 'react';
import cn from 'clsx';
import $style from './sheet.module.scss';

interface SheetProps {
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Sheet: FC<SheetProps> = ({ children, className }) => {
  return <div className={cn($style['sheet'], className)}>{children}</div>;
};
