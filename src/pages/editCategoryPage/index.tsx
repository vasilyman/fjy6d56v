import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { EditCategory } from 'src/features/editCategory';
import { Container } from 'src/shared/container';
import { firstUppercase } from 'src/shared/lib/firstUppercase';

export const EditCategoryPage = () => {
  const { t } = useTranslation();
  const { categoryId } = useParams();
  return (
    <>
      <Container>
        <h1>
          {firstUppercase(t('translation:editCategory'))} {categoryId}
        </h1>
      </Container>
      <Container>
        <EditCategory categoryId={categoryId} />
      </Container>
    </>
  );
};
