import React, { FC } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';
import { Button, NumberInput } from '../../shared';

interface AddToCardProps {
  className?: string;
  count: number;
  onUpdateCount: (v: number) => void;
  block?: boolean,
}
/**
 * Primary UI component for user interaction
 */

export const AddToCard: FC<AddToCardProps> = ({ className, count, onUpdateCount, block }) => {
  const onAdd = () => {
    onUpdateCount(count + 1);
  };
  return (
    <div className={cn($style['add-to-card'], className, { [$style['add-to-card_block']]: block })}>
      {count === 0 ? (
        <Button label="В корзину" block onClick={onAdd} />
      ) : (
        <NumberInput value={count} onInput={onUpdateCount} min={0} block />
      )}
    </div>
  );
};
