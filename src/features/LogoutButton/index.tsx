import React, { useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import { authActions, authSelectors } from 'src/entities/auth/store';
import { Button } from 'src/shared';

export const LogoutButton: FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(authActions.logout());
    // dispatch(profileActions.reset());
    return;
  };

  const accessToken = useSelector(authSelectors.getAccess);

  const isAuthorized = useMemo<boolean>(() => {
    return typeof accessToken === 'string';
  }, [accessToken]);

  return <Button label={t('translation:logout')} className={className} disabled={!isAuthorized} onClick={onClick} />;
};
