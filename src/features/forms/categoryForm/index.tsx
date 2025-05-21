import React from 'react';
import { TitleField } from '../common/titleField';
import { ImageField } from '../common/imageField';
import $style from './style.module.scss';
import type { CategoryFormData } from './type';
import { ControlProps } from '../types';
import { useTranslation } from 'react-i18next';

export const CategoryForm = ({ control }: ControlProps<CategoryFormData>) => {
  const { t } = useTranslation();
  return (
    <div className={$style['form']}>
      <ImageField control={control} name="imgUrl" />
      <TitleField control={control} name="title" label={t('translation:categoryTitle')} />
    </div>
  );
};
