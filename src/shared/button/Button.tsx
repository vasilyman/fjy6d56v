import React, { FC } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}
/**
 * Primary UI component for user interaction
 */

export const Button: FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button type="button" className={cn($style['button'], className)} onClick={onClick}>
      {label}
    </button>
  );
};
