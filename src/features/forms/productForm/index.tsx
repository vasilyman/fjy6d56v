import React from 'react';
import { TitleField } from '../common/titleField';
import { ImageField } from '../common/imageField';
import { DescriptionField } from './descriptionField';
import { SumField } from './sumField';
import $style from './style.module.scss';
import type { ProductFormData } from './type';
import { ControlProps } from '../types';
import { CategoryField } from './categoryField';
import { useTranslation } from 'react-i18next';

export const ProductForm = ({ control }: ControlProps<ProductFormData>) => {
  const { t } = useTranslation();

  return (
    <div className={$style['product-form']}>
      <ImageField control={control} name="imgUrl" />
      <TitleField control={control} name="title" label={t('translation:productTitle')} />
      <SumField control={control} name="sum" />
      <CategoryField control={control} name="categoryId" />
      <DescriptionField control={control} name="description" />
    </div>
  );
};
