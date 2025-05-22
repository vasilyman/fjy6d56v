import React, { FC, useMemo } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';
import { Icon } from '../../shared';
import { useGetCartQuery, useRemoveProductFromCartMutation } from 'src/entities/cart/store';

interface RemoveFromCartProps {
  id: string;
  className?: string;
}

export const RemoveFromCart: FC<RemoveFromCartProps> = ({ id, className }) => {
  const [removeProduct] = useRemoveProductFromCartMutation();
  const { data: cart } = useGetCartQuery(null);

  const qty = useMemo(() => {
    return cart?.find((item) => item.id === id)?.qty ?? 0;
  }, [cart, id]);

  const onDelete = () => {
    return removeProduct([{ id, qty }]);
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
