import React, { FC, useMemo } from 'react';
import { AddOrder } from 'src/features/addOrder';
import $style from './style.module.scss';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { useGetCartQuery } from 'src/entities/cart/store';
import { gql, useQuery } from '@apollo/client';
import type { Query } from 'src/app/apollo/type';
import { Sum } from 'src/shared/sum';

const productFragmentList = gql`
  query GetList($ids: [String!], $limit: Int) {
    products {
      getMany(input: { pagination: { pageSize: $limit }, ids: $ids }) {
        data {
          id
          price
          oldPrice
        }
      }
    }
  }
`;

export const CartTotal: FC = () => {
  const { t } = useTranslation();

  const { data: cart } = useGetCartQuery(null);

  const cartMap = useMemo(() => {
    return Object.fromEntries(cart?.map((item) => [item.id, item]) ?? []);
  }, [cart]);

  const productIds = useMemo(() => {
    return Object.keys(cartMap);
  }, [cartMap]);

  const { data: productItems, previousData: productItemsPrev } = useQuery<
    Pick<Query, 'products'>,
    { ids: string[]; limit: number }
  >(productFragmentList, {
    variables: {
      ids: productIds,
      limit: productIds.length,
    },
    skip: !productIds.length,
  });

  const productPricesMap = useMemo(() => {
    const data = (productItems || productItemsPrev)?.products.getMany.data ?? [];
    return Object.fromEntries(data.map((item) => [item.id, { sum: item.price, sumBase: item.oldPrice }]));
  }, [productItems, productItemsPrev]);

  const totals = useMemo(() => {
    const empty = {
      sum: 0,
      sumBase: 0,
    };
    return (
      cart?.reduce((acc, cur) => {
        acc.sum += (productPricesMap[cur.id]?.sum ?? 0) * cur.qty;
        acc.sumBase += (productPricesMap[cur.id]?.sumBase ?? 0) * cur.qty;
        return acc;
      }, empty) ?? empty
    );
  }, [productPricesMap, cart]);

  return (
    <div className={cn($style['cart-total'])}>
      <div className={cn($style['cart-total__sum'])}>{t('translation:cartTotal')}:</div>
      <Sum sum={totals.sum} sumBase={totals.sumBase} />
      <AddOrder className={$style['cart-total__add-order']} />
    </div>
  );
};
