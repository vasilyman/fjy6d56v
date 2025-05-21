import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { ProductCard, ProductCardMemoized } from '../productCard';
import { InfiniteList } from '../../shared/infiniteList';
import { Button } from '../../shared/button';
import { gql, useQuery } from '@apollo/client';
import { Query } from 'src/app/apollo/type';
import { Tcategory } from 'src/entities/category/type';

type IProduct = {
  id: string;
  sum: number;
  sumBase?: number;
  imgUrl?: string;
  title: string;
  description: string;
  pending?: boolean;
  category: Tcategory;
};

interface ProductListProps {
  className?: string;
  manualLoading?: boolean;
}

const productFragmentList = gql`
  query GetList($page: Int, $limit: Int) {
    products {
      getMany(input: { pagination: { pageNumber: $page, pageSize: $limit } }) {
        data {
          id
          name
          desc
          photo
          price
          oldPrice
          category {
            id
            name
            photo
          }
        }
        pagination {
          pageSize
          pageNumber
          total
        }
      }
    }
  }
`;

const getEmptyItem = (id: string): IProduct => ({
  id,
  sum: 0,
  sumBase: 0,
  imgUrl: '',
  title: '',
  description: '',
  pending: true,
  category: {
    id: '',
    name: '',
  },
});

const Fallback = () => <ProductCard {...getEmptyItem('0')} loading />;

const FallbackMemoized = memo(Fallback);

export const ProductList: FC<ProductListProps> = ({ className, manualLoading }) => {
  const [products, setProducts] = useState<Map<string, IProduct>>(() => new Map());

  const [pending, setPending] = useState(false);

  const [isScreenFilled, setIsScreenFilled] = useState(false);

  const totalPages = useRef(1);

  const LIMIT = 4;

  const [page, setPage] = useState(1);

  const { refetch: fetchItems } = useQuery<Pick<Query, 'products'>, { page: number; limit: number }>(
    productFragmentList,
    {
      skip: true,
    }
  );

  const loadProducts = useCallback(() => {
    setPending(true);

    fetchItems({ page, limit: LIMIT })
      .then((res) => {
        const productsToAdd: IProduct[] = res.data.products.getMany.data.map((item) => ({
          id: item.id,
          category: item.category,
          title: item.name,
          description: item.desc,
          sum: item.price,
          sumBase: item.oldPrice,
          imgUrl: item.photo,
        }));

        setProducts((products) => {
          for (const product of productsToAdd) {
            products.set(product.id, product);
          }
          return new Map(products);
        });

        totalPages.current = Math.ceil(res.data.products.getMany.pagination.total / LIMIT);
      })
      .finally(() => {
        setPending(false);
      });
  }, [fetchItems, page]);

  const onScrollEnd = useCallback(() => {
    if (manualLoading) return;

    setPage((page) => (page < totalPages.current ? page + 1 : page));
  }, [manualLoading]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!isScreenFilled) {
      setPage((page) => (page < totalPages.current ? page + 1 : page));
    }
  }, [isScreenFilled, products]);

  return (
    <>
      <div className={cn($style['product-list'], className)}>
        <InfiniteList
          items={[...products.values()]}
          ItemComponent={ProductCardMemoized}
          FallbackComponent={FallbackMemoized}
          onScrollEnd={onScrollEnd}
          onScreenFilled={() => setIsScreenFilled(true)}
        />
      </div>
      {manualLoading ? (
        <Button
          label="Загрузить еще"
          className={$style['product-list-more-button']}
          disabled={pending}
          onClick={() => setPage((page) => page + 1)}
        />
      ) : null}
    </>
  );
};
