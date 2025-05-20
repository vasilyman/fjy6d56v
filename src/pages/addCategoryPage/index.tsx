import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddProduct } from 'src/features/addProduct';
import { Container } from 'src/shared/container';
import { firstUppercase } from 'src/shared/lib/firstUppercase';

export const AddCategoryPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <h1>{firstUppercase(t('translation:addCategory'))}</h1>
      </Container>
      <Container>
        <AddProduct />
      </Container>
    </>
  );
};
