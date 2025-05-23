import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'src/shared/container';
import { firstUppercase } from 'src/shared/lib/firstUppercase';
import { CartList } from 'src/widgets/cartList';
import { CartTotal } from 'src/widgets/cartTotal';

export const CartPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Container>
        <h1>{firstUppercase(t('translation:cartPageTitle'))}</h1>
      </Container>
      <Container>
        <CartList />
        <CartTotal />
      </Container>
    </main>
  );
};
