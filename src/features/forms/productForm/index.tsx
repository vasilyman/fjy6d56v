import type { FC } from 'react';
import React from 'react';
import { FormProps } from '../types';
import { TitleField } from './titleField';
import { ImageField } from './imageField';
import { DescriptionField } from './descriptionField';
import { SumField } from './sumField';
import $style from './style.module.scss';
import type { ProductFormData } from './type';

export const ProductForm: FC<FormProps<ProductFormData>> = ({ control }) => {
  return (
    <div className={$style['product-form']}>
      <ImageField control={control} />
      <TitleField control={control} />
      <SumField control={control} />
      <DescriptionField control={control} />
    </div>
  );
};
