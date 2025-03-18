import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Icon, Modal } from 'src/shared';
import $style from './style.module.scss';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { EditProduct } from '../editProduct';
import { useNavigate, useSearchParams } from 'react-router';

type Props = {
  className?: string;
  id: string;
};

export const EditProductAction: FC<Props> = ({ className, id }) => {
  const [isShowed, setIsShowed] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const KEY = 'editProduct';

  const toggleSearchParams = (id: string, add: boolean) => {
    const searchParamsNew = new URLSearchParams(searchParams);
    searchParamsNew.delete(KEY);
    if (add) searchParamsNew.append(KEY, id);
    navigate({ search: searchParamsNew.toString() }, { replace: true });
  };

  useEffect(() => {
    if (searchParams.get(KEY) === id) setIsShowed(true);
  }, []);

  const open = () => {
    setIsShowed(true);
    toggleSearchParams(id, true);
  };

  const close = () => {
    setIsShowed(false);
    toggleSearchParams(id, false);
  };

  const { t } = useTranslation();

  return (
    <>
      <button className={cn($style['edit-product-button'], className)} type="button" onClick={open}>
        <Icon name="edit" className={$style['edit-product-button__icon']} />
      </button>
      <Modal visible={isShowed} onClose={close}>
        <h2>{t('translation:editProductTitle')}</h2>
        <EditProduct />
      </Modal>
    </>
  );
};
