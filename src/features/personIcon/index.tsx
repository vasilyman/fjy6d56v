import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import cn from 'clsx';
import { ThemeContext } from 'src/app/theme';
import { ButtonIcon } from 'src/shared/buttonIcon';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';
import { Modal } from 'src/shared';
import { SignIn } from '../signIn';
import { profileActions, profileSelectors } from 'src/entities/profile/store';
import { useAppDispatch } from 'src/app/store';

interface Props {
  className?: string;
}

export const PersonIcon: FC<Props> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const accessToken = useSelector(authSelectors.getAccess);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const userName = useSelector(profileSelectors.getName);
  const profileIsLoading = useSelector(profileSelectors.getIsLoading);

  const btnText = useMemo<string>(
    () => (isAuthenticated ? userName : t('translation:signin')),
    [isAuthenticated, t, userName]
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) return;
    dispatch(profileActions.fetchMe());
  }, [accessToken, dispatch]);

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
