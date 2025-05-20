import React, { useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { FormProps } from '../types';
import { useTranslation } from 'react-i18next';
import { Select } from 'src/shared/select';
import { useSelector } from 'react-redux';
import { authSelectors } from 'src/entities/auth/store';
import { gql, useQuery } from '@apollo/client';
import { Query } from 'src/app/apollo/type';

const categoriesListGet = gql`
  query GetMany($input: CategoryGetManyInput) {
    categories {
      getMany(input: $input) {
        data {
          id
          name
        }
        pagination {
          total
        }
      }
    }
  }
`;

export const CategoryField = <T extends FieldValues>({ control, name }: FormProps<T>) => {
  const { t } = useTranslation();
  const { field, fieldState, formState } = useController({
    name,
    control,
    rules: {
      required: t('translation:thisIsRequired'),
    },
  });

  const accessToken = useSelector(authSelectors.getAccess);

  const { data: categoriesRaw, loading: categoriesIsLoading } = useQuery<Pick<Query, 'categories'>>(categoriesListGet, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const categoriesOptions = useMemo(() => {
    return (
      categoriesRaw?.categories.getMany.data.map((item) => ({
        title: item.name,
        value: item.id,
      })) ?? []
    );
  }, [categoriesRaw]);

  return (
    <Select
      label={t('translation:category')}
      error={fieldState.error?.message}
      disabled={formState.isSubmitting || categoriesIsLoading}
      loading={categoriesIsLoading}
      items={categoriesOptions}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};
