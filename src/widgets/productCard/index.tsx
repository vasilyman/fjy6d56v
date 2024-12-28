import React, { FC, useState } from 'react';
import $style from './style.module.scss';
import { Sheet } from '../../shared';
import cn from 'clsx';
import { AddToCard } from '../../features';

interface ProductCardProps {
  sum: number;
  imgUrl?: string;
  title: string;
  description: string;
  className?: string;
}
/**
 * Primary UI component for user interaction
 */
export const ProductCard: FC<ProductCardProps> = ({ sum, imgUrl, title, description, className }) => {
  const sumFormatted = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sum);
  const [count, setCount] = useState(0);
  return (
    <Sheet className={cn($style['product-card'], className)}>
      <img className={cn($style['product-card__image'])} src={imgUrl} />
      <div className={cn($style['product-card__title'], $style['ellipsis'])}>{title}</div>
      <div className={$style['product-card__sum']} title={sumFormatted}>
        <span className={$style['ellipsis']}>{sumFormatted}</span>
        <span>&nbsp;₽</span>
      </div>
      <div className={cn($style['product-card__description'], $style['ellipsis'])}>{description}</div>
      <AddToCard className={cn($style['product-card__add-to-card'])} count={count} onUpdateCount={setCount} />
    </Sheet>
  );
};
