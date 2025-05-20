import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductForm } from '../forms/productForm';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import type { ProductFormData } from '../forms/productForm/type';
import { useTranslation } from 'react-i18next';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Mutation, ProductUpdateInput, Query } from 'src/app/apollo/type';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';

const productGet = gql`
  query GetOne($getOneId: ID!) {
    products {
      getOne(id: $getOneId) {
        id
        name
        photo
        desc
        createdAt
        updatedAt
        oldPrice
        price
        category {
          id
        }
        commandId
      }
    }
  }
`;

const editProductMutation = gql`
  mutation Put($putId: ID!, $input: ProductUpdateInput!) {
    products {
      put(id: $putId, input: $input) {
        id
      }
    }
  }
`;

export const EditProduct: FC<{ productId: string }> = ({ productId }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
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

  const accessToken = useSelector(authSelectors.getAccess);

  const { data: productRaw } = useQuery<Pick<Query, 'products'>, { getOneId: string }>(productGet, {
    skip: !accessToken,
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    variables: {
      getOneId: productId,
    },
  });

  useEffect(() => {
    if (!productRaw) return;

    const {
      category: { id },
      photo,
      name,
      price,
      desc,
    } = productRaw.products.getOne;

    setValue('categoryId', id);
    setValue('imgUrl', photo);
    setValue('title', name);
    setValue('description', desc);
    setValue('sum', price);
  }, [productRaw, setValue]);

  const [productEdit] = useMutation<Pick<Mutation, 'products'>, { input: ProductUpdateInput; putId: string }>(
    editProductMutation,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const [isSaved, seIsSaved] = useState(false);

  const onSubmit = async (data: ProductFormData) => {
    await productEdit({
      variables: {
        putId: productId,
        input: {
          categoryId: data.categoryId,
          desc: data.description,
          name: data.title,
          price: data.sum,
          photo: data.imgUrl,
        },
      },
    })
      .then(() => {
        seIsSaved(true);
      })
      .catch((e) => {
        setError('title', e);
      });
  };

  const { t } = useTranslation();

  return isSaved ? (
    'Сохранено'
  ) : (
    <div className={$style['edit-product']}>
      {productRaw ? <ProductForm control={control} /> : <div>У вас нет прав редактировать этот продукт</div>}
      {productRaw && (
        <Button label={t('translation:save')} block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
      )}
    </div>
  );
};
