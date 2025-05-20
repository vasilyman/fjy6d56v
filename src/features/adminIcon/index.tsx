import React, { FC, useContext } from 'react';
import cn from 'clsx';
import { ThemeContext } from 'src/app/theme';
import { ButtonIcon } from 'src/shared/buttonIcon';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';

interface Props {
  className?: string;
}

export const AdminIcon: FC<Props> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  return (
    isAuthenticated && (
      <ButtonIcon className={cn(className)} color={theme === 'dark' ? 'black' : 'white'} icon="user-tie" to="/admin">
        {t('translation:adminSectionTitle')}
      </ButtonIcon>
    )
  );
};
