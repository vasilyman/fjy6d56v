import React, { FC, useContext, useMemo, useState } from 'react';
import cn from 'clsx';
import { ThemeContext } from 'src/app/theme';
import { ButtonIcon } from 'src/shared/buttonIcon';
import { useTranslation } from 'react-i18next';

interface Props {
  className?: string;
}

export const PersonIcon: FC<Props> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const btnText = isAuthorized ? 'Василий' : t('translation:signin');

  const onLogin = () => {
    setIsAuthorized(true);
  };

  const to = useMemo<string | undefined>(() => {
    return isAuthorized ? '/me' : undefined;
  }, [isAuthorized]);

  const onClick = () => {
    if (!isAuthorized) return onLogin();
  };

  return (
    <ButtonIcon
      className={cn(className)}
      color={theme === 'dark' ? 'black' : 'white'}
      icon="user"
      to={to}
      onClick={onClick}
    >
      {btnText}
    </ButtonIcon>
  );
};
