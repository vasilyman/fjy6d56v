import type { FC } from 'react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductForm } from '../forms/productForm';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import type { ProductFormData } from '../forms/productForm/type';
import { useTranslation } from 'react-i18next';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';
import { Mutation, ProductAddInput } from 'src/app/apollo/type';

const productAddMutation = gql`
  mutation Add($input: ProductAddInput!) {
    products {
      add(input: $input) {
        id
      }
    }
  }
`;

enum EProductAddStatus {
  IDDLE,
  ADDED,
  ERROR,
}

export const AddProduct: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setError,
  } = useForm<ProductFormData>({
    defaultValues: {
      imgUrl: '',
      title: '',
      description: '',
      sum: 0,
    },
    mode: 'all',
  });

  const [productAddStatus, setProductAddStatusStatus] = useState<EProductAddStatus>(EProductAddStatus.IDDLE);

  const accessToken = useSelector(authSelectors.getAccess);

  const [productAdd] = useMutation<Pick<Mutation, 'products'>, { input: ProductAddInput }>(productAddMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const onSubmit = (data: ProductFormData) => {
    return productAdd({
      variables: {
        input: {
          categoryId: data.categoryId,
          desc: data.description,
          name: data.title,
          photo: data.imgUrl,
          price: data.sum,
        },
      },
    })
      .then((res) => {
        setProductAddStatusStatus(EProductAddStatus.ADDED);
        console.log(res.data.products.add.id);
      })
      .catch((e) => {
        setProductAddStatusStatus(EProductAddStatus.ERROR);
        setError('root', e);
      });
  };

  const { t } = useTranslation();

  return (
    <div className={$style['edit-product']}>
      {productAddStatus !== EProductAddStatus.ADDED ? (
        <>
          <ProductForm control={control} />
          <Button label={t('translation:save')} block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
          {productAddStatus === EProductAddStatus.ERROR && <div>Ошибка: {errors.root.message}</div>}
        </>
      ) : (
        <div>Добавлен новый товар {getValues('title')}</div>
      )}
    </div>
  );
};
