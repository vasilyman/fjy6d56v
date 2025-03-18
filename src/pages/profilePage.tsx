import React from 'react';
import { useTranslation } from 'react-i18next';
import { EditProfileMemo } from 'src/features/editProfile';
import { Container } from 'src/shared/container';
import { firstUppercase } from 'src/shared/lib/firstUppercase';

export const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Container>
        <h1>{firstUppercase(t('translation:profileTitle'))}</h1>
      </Container>
      <Container>
        <EditProfileMemo />
      </Container>
    </main>
  );
};
