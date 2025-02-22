import React, { FC } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  block?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}
/**
 * Primary UI component for user interaction
 */

export const Button: FC<ButtonProps> = ({ label, onClick, className, block, type, disabled }) => {
  return (
    <button
      type={type ?? 'button'}
      className={cn($style['button'], className, { [$style['button_block']]: block })}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
