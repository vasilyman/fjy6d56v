import { gql, useQuery } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Query } from 'src/app/apollo/type';
import { authSelectors } from 'src/entities/auth/store';
import cn from 'clsx';
import $style from './style.module.scss';

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

export const CategoriesList: FC = () => {
  const { t } = useTranslation();

  const accessToken = useSelector(authSelectors.getAccess);

  const { data: categoriesRaw } = useQuery<Pick<Query, 'categories'>>(categoriesListGet, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const categories = useMemo(() => {
    return (
      categoriesRaw?.categories.getMany.data.map((item) => ({
        title: item.name,
        value: item.id,
      })) ?? []
    );
  }, [categoriesRaw]);

  return (
    <div className={cn($style['categories'])}>
      <h3>{t('translation:categories')}</h3>
      <ul className={cn($style['categories__list'])}>
        {categories.map((item) => (
          <li key={item.value}>
            <Link to={`/admin/category/${item.value}`} className={$style['categories__link']}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
