import React, { FC } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';

type Props = {
  sum: number;
  sumBase?: number;
  className?: string;
};

export const Sum: FC<Props> = ({ sum, sumBase, className }) => {
  const sumFormatted = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sum);
  const sumFormattedOld: string | null = sumBase
    ? new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sumBase)
    : null;

  return (
    <div className={cn($style['sum'], className)} title={sumFormatted}>
      <div>
        <div className={cn($style['ellipsis'], $style['sum__actual'])}>{sumFormatted}</div>
        {sumFormattedOld && <div className={$style['sum__old']}>{sumFormattedOld}</div>}
      </div>
      <span>&nbsp;₽</span>
    </div>
  )
};
