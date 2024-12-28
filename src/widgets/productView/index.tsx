import React, { FC, useState } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { AddToCard } from '../../features';
import { Sheet } from '../../shared';

interface ProductViewProps {
  sum: number;
  imgUrl?: string;
  title: string;
  description: string;
}
/**
 * Primary UI component for user interaction
 */
export const ProductView: FC<ProductViewProps> = ({ sum, imgUrl, title, description }) => {
  const sumFormatted = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sum);
  const [count, setCount] = useState(0);
  return (
    <>
      <section className={$style['product-view__row']}>
        <img className={cn($style['product-view__image'])} src={imgUrl} />
        <div className={cn($style['product-view__title'])}>{title}</div>
        <Sheet className={$style['product-view__action']}>
          <div className={$style['product-view__sum']} title={sumFormatted}>
            <span className={$style['ellipsis']}>{sumFormatted}</span>
            <span>&nbsp;₽</span>
          </div>
          <AddToCard className={cn($style['product-view__add-to-card'])} block count={count} onUpdateCount={setCount} />
        </Sheet>
      </section>
      <section className={$style['product-view__row']}>
        <div className={cn($style['product-view__description'])}>{description}</div>
      </section>
    </>
  );
};
