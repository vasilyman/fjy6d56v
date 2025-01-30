import React, { FC } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { Button } from '../../shared';

interface CartItemProps {
  sum: number;
  imgUrl?: string;
  title: string;
}
/**
 * Primary UI component for user interaction
 */
export const CartItem: FC<CartItemProps> = ({ sum, imgUrl, title }) => {
  const sumFormatted = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sum);
  return (
    <>
      <section className={$style['cart-item__row']}>
        <img className={cn($style['cart-item__image'])} src={imgUrl} />
        <div className={cn($style['cart-item__title'])}>{title}</div>
        <div className={$style['cart-item__action']}>
          <div className={$style['cart-item__sum']} title={sumFormatted}>
            <span className={$style['ellipsis']}>{sumFormatted}</span>
            <span>&nbsp;₽</span>
          </div>
          <Button className={cn($style['cart-item__remove'])} label="Убрать из корзины" />
        </div>
      </section>
    </>
  );
};
