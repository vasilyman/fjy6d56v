import React, { FC, useMemo } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { CartItem } from '../cartItem';
import { useTranslation } from 'react-i18next';
import { useGetCartQuery } from 'src/entities/cart/store';
import { EProductType } from 'src/entities/productType';
import { gql, useQuery } from '@apollo/client';
import { Query } from 'src/app/apollo/type';

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

const productFragmentList = gql`
  query GetList($ids: [String!], $limit: Int) {
    products {
      getMany(input: { pagination: { pageSize: $limit }, ids: $ids }) {
        data {
          id
          name
          desc
          photo
          price
        }
        pagination {
          pageSize
          pageNumber
          total
        }
      }
    }
  }
`;

export const CartList: FC<CartListProps> = ({ className }) => {
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

  const items = useMemo(() => {
    return cart?.length > 0
      ? (productItems || productItemsPrev)?.products.getMany.data?.map((item) => ({
          id: item.id,
          sum: item.price,
          qty: cartMap[item.id]?.qty,
          imgUrl: item.photo,
          title: item.name,
          description: item.desc,
          type: item.category?.name as EProductType,
        })) ?? []
      : [];
  }, [cartMap, productItems, productItemsPrev, cart]);

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
