import React from 'react';
import { useTranslation } from 'react-i18next';
import { EditProfileMemo } from 'src/features/editProfile';
import { LogoutButton } from 'src/features/LogoutButton';
import { Container } from 'src/shared/container';
import { firstUppercase } from 'src/shared/lib/firstUppercase';
import $style from './style.module.scss';

export const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Container>
        <h1>{firstUppercase(t('translation:profileTitle'))}</h1>
      </Container>
      <Container>
        <EditProfileMemo />
        <LogoutButton className={$style['profile-page__logout-button']} />
      </Container>
    </main>
  );
};
