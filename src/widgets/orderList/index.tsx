import { gql, useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { OrderProduct, Query } from 'src/app/apollo/type';
import { authSelectors } from 'src/entities/auth/store';
import { OrderItem } from 'src/entities/order/item';
import { TOrderProduct } from 'src/entities/order/type';
import $style from './style.module.scss';

const orderListGet = gql`
  query GetMany($input: OrderGetManyInput) {
    orders {
      getMany(input: $input) {
        pagination {
          total
        }
        data {
          products {
            _id
            product {
              id
              photo
              name
            }
            quantity
          }
          status
          id
        }
      }
    }
  }
`;

export const OrderList = () => {
  const accessToken = useSelector(authSelectors.getAccess);

  const { data: ordersRaw, loading: isLoading } = useQuery<Pick<Query, 'orders'>>(orderListGet, {
    skip: !accessToken,
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const orders = useMemo(() => {
    return ordersRaw?.orders.getMany.data ?? [];
  }, [ordersRaw]);

  const transformApiProduct = (orderItem: OrderProduct): TOrderProduct => {
    return {
      id: orderItem._id,
      qty: orderItem.quantity,
      product: {
        id: orderItem.product.id,
        imgUrl: orderItem.product.photo,
        title: orderItem.product.name,
      },
    };
  };

  return (
    <div className={$style['list']}>
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={{
            id: order.id,
            status: order.status,
            products: order.products.map(transformApiProduct),
          }}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
