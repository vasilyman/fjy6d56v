import React, { useMemo, type FC } from 'react';
import type { TOrder } from '../type';
import { BtnGroup } from 'src/shared/btnGroup';
import $style from './style.module.scss';
import { OrderStatus } from 'src/entities/orderStatus';
import { gql, useMutation } from '@apollo/client';
import { Mutation, OrderUpdateInput, OrderStatus as EOrderStatus } from 'src/app/apollo/type';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';
import { useTranslation } from 'react-i18next';

type Props = {
  order: TOrder;
  isLoading?: boolean;
};

const orderPatchMutation = gql`
  mutation Patch($patchId: ID!, $input: OrderUpdateInput!) {
    orders {
      patch(id: $patchId, input: $input) {
        id
      }
    }
  }
`;

export const OrderItem: FC<Props> = ({ order: { id, status, products }, isLoading }) => {
  const accessToken = useSelector(authSelectors.getAccess);

  const [changeOrder, { loading: isMutationLoading }] = useMutation<
    Pick<Mutation, 'orders'>,
    { input: OrderUpdateInput; patchId: string }
  >(orderPatchMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    // TODO remove after backend will support subscriotpions
    update(cache) {
      cache.evict({ fieldName: 'orders' });
      cache.gc();
    },
  });

  const statuses = useMemo(() => {
    return Object.entries(OrderStatus).map(([title, value]) => ({
      title,
      value,
      loading: (isMutationLoading || isLoading) && value === status,
    }));
  }, [isMutationLoading, status, isLoading]);

  const onChangeStatus = (status: string) => {
    changeOrder({
      variables: {
        patchId: id,
        input: {
          status: status as EOrderStatus,
        },
      },
    }).catch((e) => {
      console.log(e);
    });
  };

  const { t } = useTranslation();

  return (
    <div className={$style['item']}>
      <div>
        {t('translation:orderNo')}: {id}
      </div>
      <div className={$style['item__list']}>
        {products.map((item) => (
          <img key={`${item.id}-${item.product.id}`} src={item.product.imgUrl} className={$style['item__img']} />
        ))}
      </div>
      <BtnGroup items={statuses} name={`order-status-${id}`} value={status} onChange={onChangeStatus} />
    </div>
  );
};
