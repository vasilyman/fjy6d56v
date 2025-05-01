import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/shared';

type Props = {
  className?: string;
};

export const AddOrder: FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  return <Button className={className} label={t('translation:addOrder')} />;
};
