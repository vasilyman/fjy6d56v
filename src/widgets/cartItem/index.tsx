import React, { FC } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { AddToCard } from 'src/features';
import { TProduct } from 'src/entities/product';
import { RemoveFromCart } from 'src/features/removeFromCart';
import { Tcategory } from 'src/entities/category/type';

export interface CartItemProps {
  id: string;
  sum: number;
  imgUrl?: string;
  title: string;
  className?: string;
  description?: string;
  category: Tcategory;
}

export const CartItem: FC<CartItemProps> = ({ sum, imgUrl, title, description, id, category }) => {
  const sumFormatted = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sum);

  const product: TProduct = {
    id,
    category,
    title,
    sum,
    description,
    imgUrl,
  };

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
          <AddToCard className={cn($style['cart-item__add-to-card'])} product={product} />
          <RemoveFromCart id={id} />
        </div>
      </section>
    </>
  );
};
