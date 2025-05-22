import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import cn from 'clsx';
import { ThemeContext } from 'src/app/theme';
import { ButtonIcon } from 'src/shared/buttonIcon';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';
import { Modal } from 'src/shared';
import { SignIn } from '../signIn';
import { gql, useQuery } from '@apollo/client';
import { Query } from 'src/app/apollo/type';

interface Props {
  className?: string;
}

const profileNameGet = gql`
  query Profile {
    profile {
      name
      email
    }
  }
`;

export const PersonIcon: FC<Props> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const accessToken = useSelector(authSelectors.getAccess);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  const {
    data: profile,
    loading: profileIsLoading,
    refetch: fetchMe,
  } = useQuery<Pick<Query, 'profile'>, { ids: string[]; limit: number }>(profileNameGet, {
    skip: !accessToken,
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const userName = useMemo<string>(() => profile?.profile.name || profile?.profile.email, [profile]);

  const btnText = useMemo<string>(
    () => (isAuthenticated ? userName : t('translation:signin')),
    [isAuthenticated, t, userName]
  );

  useEffect(() => {
    if (!accessToken) return;
    fetchMe();
  }, [accessToken, fetchMe]);

  const to = useMemo<string | undefined>(() => {
    return isAuthenticated ? '/me' : undefined;
  }, [isAuthenticated]);

  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const onClick = () => {
    if (!isAuthenticated) return setIsLoginFormOpen(true);
  };

  return (
    <>
      <ButtonIcon
        className={cn(className)}
        color={theme === 'dark' ? 'black' : 'white'}
        icon="user"
        to={to}
        onClick={onClick}
      >
        {profileIsLoading ? 'loading...' : btnText}
      </ButtonIcon>
      <Modal visible={isLoginFormOpen} onClose={() => setIsLoginFormOpen(false)}>
        <SignIn onSuccess={() => setIsLoginFormOpen(false)} />
      </Modal>
    </>
  );
};
