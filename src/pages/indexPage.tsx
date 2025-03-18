import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'src/shared/container';
import { firstUppercase } from 'src/shared/lib/firstUppercase';
import { ProductList } from 'src/widgets/productList';

export const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Container>
        <h1>{firstUppercase(t('translation:ourProductsTitle'))}</h1>
      </Container>
      <Container>
        <ProductList />
      </Container>
    </main>
  );
};
