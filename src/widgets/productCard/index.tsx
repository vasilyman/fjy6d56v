import React, { FC, memo } from 'react';
import $style from './style.module.scss';
import { Sheet } from '../../shared';
import cn from 'clsx';
import { AddToCard } from '../../features';
import { EditProductAction } from 'src/features/EditProductAction';
import { TProduct } from 'src/entities/product';
import { authSelectors } from 'src/entities/auth/store';
import { useSelector } from 'react-redux';
import { EAuthPermissions } from 'src/entities/auth/const';
import { Sum } from 'src/shared/sum';
import { Tcategory } from 'src/entities/category/type';

interface ProductCardProps {
  id: string;
  sum: number;
  sumBase?: number;
  imgUrl?: string;
  title: string;
  description: string;
  loading?: boolean;
  className?: string;
  category: Tcategory;
}

export const ProductCard: FC<ProductCardProps> = ({
  sum,
  sumBase,
  imgUrl,
  title,
  description,
  className,
  id,
  loading,
  category,
}) => {
  const product: TProduct = {
    id,
    category,
    title,
    sum,
    sumBase,
    description,
    imgUrl,
  };
  const permissions = useSelector(authSelectors.getPermissions);
  return (
    <Sheet id={id} className={cn($style['product-card'], { [$style['product-card_loading']]: loading }, className)}>
      <img className={cn($style['product-card__image'])} src={imgUrl} />
      <div className={cn($style['product-card__title'], $style['ellipsis'])}>{title}</div>
      {category && <div className={cn($style['product-card__category'], $style['ellipsis'])}>{category.name}</div>}
      <Sum sum={sum} sumBase={sumBase} />
      <div className={cn($style['product-card__description'], $style['ellipsis'])}>{description}</div>
      <AddToCard className={cn($style['product-card__add-to-card'])} disabled={loading} product={product} />
      {permissions.includes(EAuthPermissions.CAN_EDIT_PRODUCT) && (
        <EditProductAction id={id} className={$style['product-card__edit-button']} />
      )}
    </Sheet>
  );
};

export const ProductCardMemoized = memo(ProductCard);
