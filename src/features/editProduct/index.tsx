import type { FC } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ProductForm } from '../forms/productForm';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import type { ProductFormData } from '../forms/productForm/type';
import { useTranslation } from 'react-i18next';

export const EditProduct: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues: {
      imgUrl: '',
      title: '',
      description: '',
      sum: 0,
    },
    mode: 'all',
  });

  const onSubmit = async (data: ProductFormData) => {
    const res = await new Promise((res) => {
      setTimeout(() => {
        res(data);
      }, 1000);
    });
    console.log(res);
  };

  const { t } = useTranslation();

  return (
    <div className={$style['edit-product']}>
      <ProductForm control={control} />
      <Button label={t('translation:save')} block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
    </div>
  );
};
