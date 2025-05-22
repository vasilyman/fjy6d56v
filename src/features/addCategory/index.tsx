import type { FC } from 'react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../shared/button';
import $style from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';
import { CategoryAddInput, Mutation } from 'src/app/apollo/type';
import { CategoryForm } from '../forms/categoryForm';
import { CategoryFormData } from '../forms/categoryForm/type';

const categoryAddMutation = gql`
  mutation Add($input: CategoryAddInput!) {
    categories {
      add(input: $input) {
        id
      }
    }
  }
`;

enum ECategoryAddStatus {
  IDDLE,
  ADDED,
  ERROR,
}

export const AddCategory: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setError,
  } = useForm<CategoryFormData>({
    defaultValues: {
      imgUrl: '',
      title: '',
    },
    mode: 'all',
  });

  const [categoryAddStatus, setCategoryAddStatusStatus] = useState<ECategoryAddStatus>(ECategoryAddStatus.IDDLE);

  const accessToken = useSelector(authSelectors.getAccess);

  const [categoryAdd] = useMutation<Pick<Mutation, 'categories'>, { input: CategoryAddInput }>(categoryAddMutation, {
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
  });

  const onSubmit = (data: CategoryFormData) => {
    return categoryAdd({
      variables: {
        input: {
          name: data.title,
          photo: data.imgUrl,
        },
      },
    })
      .then((res) => {
        setCategoryAddStatusStatus(ECategoryAddStatus.ADDED);
        console.log(res.data.categories.add.id);
      })
      .catch((e) => {
        setCategoryAddStatusStatus(ECategoryAddStatus.ERROR);
        setError('root', e);
      });
  };

  const { t } = useTranslation();

  return (
    <div className={$style['add-category']}>
      {categoryAddStatus !== ECategoryAddStatus.ADDED ? (
        <>
          <CategoryForm control={control} />
          <Button label={t('translation:save')} block disabled={isSubmitting} onClick={handleSubmit(onSubmit)} />
          {categoryAddStatus === ECategoryAddStatus.ERROR && <div>Ошибка: {errors.root.message}</div>}
        </>
      ) : (
        <div>Добавлена новая категория {getValues('title')}</div>
      )}
    </div>
  );
};
