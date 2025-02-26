import React, { FC, memo } from 'react';
import $style from './style.module.scss';
import { Sheet } from '../../shared';
import cn from 'clsx';

interface OperationShortProps {
  sum: number;
  type: string;
  title: string;
  description: string;
  className?: string;
}
/**
 * Primary UI component for user interaction
 */
export const OperationShort: FC<OperationShortProps> = ({ sum, type, title, description, className }) => {
  const sumFormatted = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sum);
  return (
    <Sheet className={cn($style['operation-short'], className)}>
      <div className={cn($style['operation-short__title'], $style['ellipsis'])}>{title}</div>
      <div className={$style['operation-short__sum']} title={sumFormatted}>
        <span className={$style['ellipsis']}>{sumFormatted}</span>
        <span>&nbsp;₽</span>
      </div>
      <div className={cn($style['operation-short__description'], $style['ellipsis'])}>{description}</div>
      <div className={cn($style['operation-short__type'], $style['ellipsis'])}>{type}</div>
    </Sheet>
  );
};

export const OperationShortMemoized = memo(OperationShort);
