import React, { FC, useMemo } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { CartItem } from '../cartItem';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { accountSelectors } from 'src/entities/account/store';
import { EProductType } from 'src/entities/productType';

export type CartItem = {
  id: string;
  sum: number;
  qty: number;
  imgUrl?: string;
  title: string;
  description?: string;
  type: EProductType;
};

interface CartListProps {
  className?: string;
}

export const CartList: FC<CartListProps> = ({ className }) => {
  const { t } = useTranslation();

  const orderPositions = useSelector(accountSelectors.getOrderPositions);
  const items = useMemo(() => {
    if (!orderPositions) return [];

    return Object.keys(orderPositions).map((key) => ({
      id: orderPositions[key].product?.id,
      sum: orderPositions[key].salePriceTotal,
      qty: orderPositions[key].qty,
      imgUrl: orderPositions[key].product?.imgUrl,
      title: orderPositions[key].product?.title,
      description: orderPositions[key].product.description,
      type: orderPositions[key].product?.type,
    }));
  }, [orderPositions]);

  return (
    <section className={cn(className, $style['cart-list'])}>
      {items.length === 0 ? (
        <div className={$style['cart-list__empty']}>{t('translation:cartEmpty')}</div>
      ) : (
        items.map((item) => <CartItem key={item.id} {...item} className={$style['cart-list__item']} />)
      )}
    </section>
  );
};
