import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddCategoryIcon } from 'src/features/addCategoryIcon';
import { AddProductIcon } from 'src/features/addProductIcon';
import { Container } from 'src/shared/container';
import { firstUppercase } from 'src/shared/lib/firstUppercase';

export const AdminPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <h1>{firstUppercase(t('translation:adminSectionTitle'))}</h1>
      </Container>
      <Container>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
          <AddProductIcon />
          <AddCategoryIcon />
        </div>
      </Container>
    </>
  );
};
