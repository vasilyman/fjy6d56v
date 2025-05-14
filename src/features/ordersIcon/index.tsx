import React, { FC, useContext, useMemo } from 'react';
import cn from 'clsx';
import { ThemeContext } from 'src/app/theme';
import { ButtonIcon } from 'src/shared/buttonIcon';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';
import { gql, useQuery } from '@apollo/client';
import { Query } from 'src/app/apollo/type';

interface Props {
  className?: string;
}

const ordersTotalGet = gql`
  query GetMany($input: OrderGetManyInput) {
    orders {
      getMany(input: $input) {
        pagination {
          total
        }
      }
    }
  }
`;

export const OrdersIcon: FC<Props> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const accessToken = useSelector(authSelectors.getAccess);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  const { data: ordersTotal, loading: ordersTotalIsLoading } = useQuery<Pick<Query, 'orders'>>(ordersTotalGet, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const total = useMemo<number>(() => {
    return ordersTotal?.orders.getMany.pagination.total;
  }, [ordersTotal]);

  const to = useMemo<string | undefined>(() => {
    return isAuthenticated ? '/orders' : undefined;
  }, [isAuthenticated]);

  return (
    <>
      <ButtonIcon className={cn(className)} color={theme === 'dark' ? 'black' : 'white'} icon="list" to={to}>
        {ordersTotalIsLoading ? 'loading...' : `${t('translation:orders')} (${total})`}
      </ButtonIcon>
    </>
  );
};
