import React, { FC } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { Button } from '../../shared';

interface OperationFullProps {
  sum: number;
  type: string;
  title: string;
  description: string;
  date: Date;
  className?: string;
}
/**
 * Primary UI component for user interaction
 */
export const OperationFull: FC<OperationFullProps> = ({ sum, type, title, description, className, date }) => {
  const sumFormatted = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sum);
  const dateFormatted = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    date
  );
  return (
    <div className={cn($style['operation-full'], className)}>
      <div className={cn($style['operation-full__title'], $style['ellipsis'])}>{title}</div>
      <div className={cn($style['operation-full__type'], $style['ellipsis'])}>{type}</div>
      <div className={cn($style['operation-full__date'], $style['ellipsis'])}>{dateFormatted}</div>
      <div className={$style['operation-full__sum']} title={sumFormatted}>
        <span className={$style['ellipsis']}>{sumFormatted}</span>
        <span>&nbsp;₽</span>
      </div>
      <div className={cn($style['operation-full__description'], $style['ellipsis'])}>{description}</div>
      <Button label="Редактировать" className={$style['operation-full__button']} />
    </div>
  );
};
