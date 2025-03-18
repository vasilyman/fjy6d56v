import React, { FC } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { CartItem } from '../cartItem';
import { useTranslation } from 'react-i18next';

export type CartItem = {
  id: string;
  sum: number;
  qty: number;
  imgUrl?: string;
  title: string;
  description?: string;
};

interface CartListProps {
  items: CartItem[];
  className?: string;
  onInput?: (id: string, v?: number) => void;
  onDelete?: (id: string) => void;
}

export const CartList: FC<CartListProps> = ({ items, className, onInput, onDelete }) => {
  const { t } = useTranslation();
  return (
    <section className={cn(className, $style['cart-list'])}>
      {items.length === 0 ? (
        <div className={$style['cart-list__empty']}>{t('translation:cartEmpty')}</div>
      ) : (
        items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            className={$style['cart-list__item']}
            onInput={(v) => onInput(item.id, v)}
            onDelete={() => onDelete(item.id)}
          />
        ))
      )}
    </section>
  );
};
