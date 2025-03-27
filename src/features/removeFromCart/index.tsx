import React, { FC } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';
import { Icon } from '../../shared';
import { deleteProduct } from 'src/entities/account/store';
import { useAppDispatch } from 'src/app/store';

interface RemoveFromCartProps {
  id: string;
  className?: string;
}

export const RemoveFromCart: FC<RemoveFromCartProps> = ({ id, className }) => {
  const dispatch = useAppDispatch();
  const onDelete = () => {
    return dispatch(deleteProduct(id));
  };

  return (
    <button
      type="button"
      title="Убрать из корзины"
      className={cn($style['remove-from-cart'], className)}
      onClick={onDelete}
    >
      <Icon name="trash" size="24" />
    </button>
  );
};
