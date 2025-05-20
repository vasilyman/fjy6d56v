import { gql, useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Query } from 'src/app/apollo/type';
import { authSelectors } from 'src/entities/auth/store';

const orderListGet = gql`
  query GetMany($input: OrderGetManyInput) {
    orders {
      getMany(input: $input) {
        pagination {
          total
        }
        data {
          products {
            product {
              name
            }
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

  const { data: ordersRaw } = useQuery<Pick<Query, 'orders'>>(orderListGet, {
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
  return (
    <ul>
      {orders.map((order, i) => (
        <li key={order.id}>
          <div>Статус: {order.status}</div>
          <div>Позиций: {order.products.length}</div>
        </li>
      ))}
    </ul>
  );
};
