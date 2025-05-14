import { gql, useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Mutation, OrderAddInput } from 'src/app/apollo/type';
import { useGetCartQuery } from 'src/entities/cart/store';
import { Button } from 'src/shared';

type Props = {
  className?: string;
  onSuccess?: () => void;
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

export const AddOrder: FC<Props> = ({ className, onSuccess }) => {
  const { t } = useTranslation();

  const { data: cart } = useGetCartQuery(null);

  const [orderAdd, { loading }] = useMutation<Pick<Mutation, 'orders'>, { input: OrderAddInput }>(orderAddMutation);

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
        if (onSuccess) onSuccess();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return <Button className={className} label={t('translation:addOrder')} disabled={loading} onClick={onClick} />;
};
