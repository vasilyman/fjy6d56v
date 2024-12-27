import React, { FC } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';
import { Button, NumberInput } from '../../shared';

interface AddToCardProps {
  className?: string;
  count: number;
  onUpdateCount: (v: number) => void;
}
/**
 * Primary UI component for user interaction
 */

export const AddToCard: FC<AddToCardProps> = ({ className, count, onUpdateCount }) => {
  const onAdd = () => {
    onUpdateCount(count + 1);
  };
  return (
    <div className={className}>
      {count === 0 ? (
        <Button label="В корзину" onClick={onAdd} />
      ) : (
        <NumberInput value={count} onInput={onUpdateCount} min={0} />
      )}
    </div>
  );
};
