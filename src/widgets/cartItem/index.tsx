import React, { FC } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { Icon, NumberInput } from '../../shared';

export interface CartItemProps {
  sum: number;
  imgUrl?: string;
  title: string;
  qty: number;
  className?: string;
  description?: string;
  onInput?: (v?: number) => void;
  onDelete?: () => void;
}

export const CartItem: FC<CartItemProps> = ({ sum, imgUrl, title, qty, description, onInput, onDelete }) => {
  const sumFormatted = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sum);
  return (
    <>
      <section className={$style['cart-item__row']}>
        <img className={cn($style['cart-item__image'])} src={imgUrl} />
        <div className={cn($style['cart-item__content'])}>
          <div className={cn($style['cart-item__title'])}>{title}</div>
          <div className={cn($style['cart-item__description'])}>{description}</div>
        </div>
        <div className={$style['cart-item__action']}>
          <div className={$style['cart-item__sum']} title={sumFormatted}>
            <span className={$style['ellipsis']}>{sumFormatted}</span>
            <span>&nbsp;₽</span>
          </div>
          <NumberInput value={qty} onInput={onInput} min={1} />
          <button
            type="button"
            title="Убрать из корзины"
            className={cn($style['cart-item__remove'])}
            onClick={onDelete}
          >
            <Icon name="trash" size="24" />
          </button>
        </div>
      </section>
    </>
  );
};
