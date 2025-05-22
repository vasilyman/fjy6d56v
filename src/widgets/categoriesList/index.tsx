import { gql, useQuery } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Query } from 'src/app/apollo/type';
import { authSelectors } from 'src/entities/auth/store';

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
    <ul>
      {categories.map((item) => (
        <li key={item.value}>
          <Link to={`/admin/category/${item.value}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};
