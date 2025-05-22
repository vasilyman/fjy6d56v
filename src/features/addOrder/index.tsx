import { gql, useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Mutation, OrderAddInput } from 'src/app/apollo/type';
import { authSelectors } from 'src/entities/auth/store';
import { useClearCartMutation, useGetCartQuery } from 'src/entities/cart/store';
import { Button } from 'src/shared';

type Props = {
  className?: string;
};

const orderAddMutation = gql`
  mutation Mutation($input: OrderAddInput!) {
    orders {
      add(input: $input) {
        status
      }
    }
  }
`;

export const AddOrder: FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const { data: cart } = useGetCartQuery(null);

  const accessToken = useSelector(authSelectors.getAccess);

  const [orderAdd, { loading }] = useMutation<Pick<Mutation, 'orders'>, { input: OrderAddInput }>(orderAddMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const [clearCart] = useClearCartMutation();

  const onClick = () => {
    const products = cart.map((item) => ({ id: item.id, quantity: item.qty }));

    orderAdd({
      variables: {
        input: {
          products,
        },
      },
    })
      .then(() => {
        clearCart([]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return <Button className={className} label={t('translation:addOrder')} disabled={loading} onClick={onClick} />;
};
