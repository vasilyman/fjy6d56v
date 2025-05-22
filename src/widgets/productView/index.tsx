import React, { FC } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { AddToCard } from '../../features';
import { Sheet } from '../../shared';
import { TProduct } from 'src/entities/product';
import { Tcategory } from 'src/entities/category/type';

interface ProductViewProps {
  id: string;
  sum: number;
  imgUrl?: string;
  title: string;
  description: string;
  category?: Tcategory;
}
/**
 * Primary UI component for user interaction
 */
export const ProductView: FC<ProductViewProps> = ({ id, sum, imgUrl, title, description, category }) => {
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
      <section className={$style['product-view__row']}>
        <img className={cn($style['product-view__image'])} src={imgUrl} />
        <div className={cn($style['product-view__info'])}>
          <div className={cn($style['product-view__title'])}>{title}</div>
          <div className={cn($style['product-view__type'])}>{category.name}</div>
        </div>
        <Sheet className={$style['product-view__action']}>
          <div className={$style['product-view__sum']} title={sumFormatted}>
            <span className={$style['ellipsis']}>{sumFormatted}</span>
            <span>&nbsp;₽</span>
          </div>
          <AddToCard className={cn($style['product-view__add-to-card'])} block product={product} />
        </Sheet>
      </section>
      <section className={$style['product-view__row']}>
        <div className={cn($style['product-view__description'])}>{description}</div>
      </section>
    </>
  );
};
