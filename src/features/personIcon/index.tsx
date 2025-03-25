import React, { FC, useContext, useMemo, useState } from 'react';
import cn from 'clsx';
import { ThemeContext } from 'src/app/theme';
import { ButtonIcon } from 'src/shared/buttonIcon';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { tokenSelectors } from 'src/entities/token/store';
import { Modal } from 'src/shared';
import { SignIn } from '../signIn';

interface Props {
  className?: string;
}

export const PersonIcon: FC<Props> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const accessToken = useSelector(tokenSelectors.getAccess);

  const isAuthorized = useMemo<boolean>(() => {
    return typeof accessToken === 'string';
  }, [accessToken]);

  const btnText = useMemo<string>(() => (isAuthorized ? 'Василий' : t('translation:signin')), [isAuthorized, t]);

  const to = useMemo<string | undefined>(() => {
    return isAuthorized ? '/me' : undefined;
  }, [isAuthorized]);

  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const onClick = () => {
    if (!isAuthorized) return setIsLoginFormOpen(true);
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
        {btnText}
      </ButtonIcon>
      <Modal visible={isLoginFormOpen} onClose={() => setIsLoginFormOpen(false)}>
        <SignIn onSuccess={() => setIsLoginFormOpen(false)} />
      </Modal>
    </>
  );
};
