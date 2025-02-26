import React, { FC, memo, useState } from 'react';
import $style from './style.module.scss';
import { Sheet } from '../../shared';
import cn from 'clsx';
import { AddToCard } from '../../features';

interface ProductCardProps {
  id: string;
  sum: number;
  imgUrl?: string;
  title: string;
  description: string;
  loading?: boolean;
  className?: string;
}
/**
 * Primary UI component for user interaction
 */
export const ProductCard: FC<ProductCardProps> = ({ sum, imgUrl, title, description, className, id, loading }) => {
  const sumFormatted = new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(sum);
  const [count, setCount] = useState(0);
  return (
    <Sheet id={id} className={cn($style['product-card'], { [$style['product-card_loading']]: loading }, className)}>
      <img className={cn($style['product-card__image'])} src={imgUrl} />
      <div className={cn($style['product-card__title'], $style['ellipsis'])}>{title}</div>
      <div className={$style['product-card__sum']} title={sumFormatted}>
        <span className={$style['ellipsis']}>{sumFormatted}</span>
        <span>&nbsp;₽</span>
      </div>
      <div className={cn($style['product-card__description'], $style['ellipsis'])}>{description}</div>
      <AddToCard
        className={cn($style['product-card__add-to-card'])}
        count={count}
        disabled={loading}
        onUpdateCount={setCount}
      />
    </Sheet>
  );
};

export const ProductCardMemoized = memo(ProductCard);
