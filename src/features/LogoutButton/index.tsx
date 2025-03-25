import React, { useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import { logout, tokenSelectors } from 'src/entities/token/store';
import { Button } from 'src/shared';

export const LogoutButton: FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const onClick = () => {
    return dispatch(logout());
  };

  const accessToken = useSelector(tokenSelectors.getAccess);

  const isAuthorized = useMemo<boolean>(() => {
    return typeof accessToken === 'string';
  }, [accessToken]);

  return <Button label={t('translation:logout')} className={className} disabled={!isAuthorized} onClick={onClick} />;
};
