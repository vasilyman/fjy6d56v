import React from 'react';
import { TitleField } from './titleField';
import { ImageField } from './imageField';
import { DescriptionField } from './descriptionField';
import { SumField } from './sumField';
import $style from './style.module.scss';
import type { ProductFormData } from './type';
import { ControlProps } from '../types';
import { CategoryField } from './categoryField';

export const ProductForm = ({ control }: ControlProps<ProductFormData>) => {
  return (
    <div className={$style['product-form']}>
      <ImageField control={control} name="imgUrl" />
      <TitleField control={control} name="title" />
      <SumField control={control} name="sum" />
      <CategoryField control={control} name="categoryId" />
      <DescriptionField control={control} name="description" />
    </div>
  );
};
