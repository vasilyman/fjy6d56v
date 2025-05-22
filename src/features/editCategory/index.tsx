import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';
import { CategoryUpdateInput, Mutation, Query } from 'src/app/apollo/type';
import { CategoryForm } from '../forms/categoryForm';
import { CategoryFormData } from '../forms/categoryForm/type';

const categoryPatchMutation = gql`
  mutation Patch($patchId: ID!, $input: CategoryUpdateInput!) {
    categories {
      patch(id: $patchId, input: $input) {
        id
      }
    }
  }
`;

const categoryGet = gql`
  query GetOne($getOneId: ID!) {
    categories {
      getOne(id: $getOneId) {
        id
        name
        photo
        createdAt
        updatedAt
        commandId
      }
    }
  }
`;

enum ECategoryAddStatus {
  IDDLE,
  ADDED,
  ERROR,
}

export const EditCategory: FC<{ categoryId: string }> = ({ categoryId }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setError,
    setValue,
  } = useForm<CategoryFormData>({
    defaultValues: {
      imgUrl: '',
      title: '',
    },
    mode: 'all',
  });

  const [categoryAddStatus, setCategoryAddStatusStatus] = useState<ECategoryAddStatus>(ECategoryAddStatus.IDDLE);

  const accessToken = useSelector(authSelectors.getAccess);

  const { data: categoryRaw } = useQuery<Pick<Query, 'categories'>, { getOneId: string }>(categoryGet, {
    skip: !accessToken,
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    variables: {
      getOneId: categoryId,
    },
  });

  useEffect(() => {
    if (!categoryRaw) return;

    const { photo, name } = categoryRaw.categories.getOne;

    setValue('imgUrl', photo ?? '');
    setValue('title', name ?? '');
  }, [categoryRaw, setValue]);

  const [categoryEdit] = useMutation<Pick<Mutation, 'categories'>, { input: CategoryUpdateInput; patchId: string }>(
    categoryPatchMutation,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
      // TODO remove after backend will support subscriotpions
      update(cache) {
        cache.evict({ fieldName: 'categories' });
        cache.gc();
      },
    }
  );

  const onSubmit = (data: CategoryFormData) => {
    return categoryEdit({
      variables: {
        patchId: categoryId,
        input: {
          name: data.title,
          photo: data.imgUrl,
        },
      },
    })
      .then((res) => {
        setCategoryAddStatusStatus(ECategoryAddStatus.ADDED);
        console.log(res.data.categories.patch.id);
      })
      .catch((e) => {
        setCategoryAddStatusStatus(ECategoryAddStatus.ERROR);
        setError('root', e);
        console.log(e);
      });
  };

  const { t } = useTranslation();

  useEffect(() => {
    setCategoryAddStatusStatus(ECategoryAddStatus.IDDLE);
  }, [categoryId]);

  return (
    <div className={$style['category']}>
      <CategoryForm control={control} />
      <Button label={t('translation:save')} block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
      {categoryAddStatus === ECategoryAddStatus.ERROR && <div>Ошибка: {errors.root.message}</div>}
      {categoryAddStatus === ECategoryAddStatus.ADDED && <div>Сохранено {getValues('title')}</div>}
    </div>
  );
};
