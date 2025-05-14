import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'src/shared/container';
import { firstUppercase } from 'src/shared/lib/firstUppercase';
import { OrderList } from 'src/widgets/orderList';

export const OrdersPage = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Container>
        <h1>{firstUppercase(t('translation:orders'))}</h1>
      </Container>
      <Container>
        <OrderList />
      </Container>
    </main>
  );
};
