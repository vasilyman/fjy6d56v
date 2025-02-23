import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { ProductCard, ProductCardMemoized } from '../productCard';
import { InfiniteList } from '../../shared/infiniteList';
import { Button } from '../../shared/button';

type IProduct = {
  id: string;
  sum: number;
  imgUrl?: string;
  title: string;
  description: string;
  pending?: boolean;
};

interface ProductListProps {
  className?: string;
  manualLoading?: boolean;
}

const fetchItems = async (offset: number, limit: number): Promise<IProduct[]> => {
  const products: IProduct[] = [
    ...Array(limit)
      .fill(0)
      .map((_, i) => ({
        id: `${offset + i}`,
        sum: 200,
        imgUrl: '',
        title: `Product ${offset + i}`,
        description: 'Product description',
      })),
  ];

  return new Promise((res) => {
    setTimeout(() => {
      res(products);
    }, 1000);
  });
};

const getEmptyItem = (id: string): IProduct => ({
  id,
  sum: 0,
  imgUrl: '',
  title: '',
  description: '',
  pending: true,
});

const Fallback = () => <ProductCard {...getEmptyItem('0')} loading />;

const FallbackMemoized = memo(Fallback);

export const ProductList: FC<ProductListProps> = ({ className, manualLoading }) => {
  const [products, setProducts] = useState<Map<string, IProduct>>(() => new Map());

  const [pending, setPending] = useState(false);

  const LIMIT = 8;

  const count = useRef(products.size);

  const loadProducts = useCallback(() => {
    setPending(true);
    const productsToAdd = Array(LIMIT)
      .fill(0)
      .map((_, i) => getEmptyItem(`${count.current + i}`));

    fetchItems(count.current, LIMIT)
      .then((productsToAdd) => {
        setProducts((products) => {
          for (const product of productsToAdd) {
            products.set(product.id, product);
          }
          return new Map(products);
        });
      })
      .finally(() => {
        setPending(false);
      });

    setProducts((products) => {
      for (const product of productsToAdd) {
        products.set(product.id, product);
      }
      return new Map(products);
    });

    count.current += LIMIT;
  }, []);

  const onScrollEnd = useCallback(() => {
    if (manualLoading) return;

    loadProducts();
  }, [loadProducts, manualLoading]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <div className={cn($style['product-list'], className)}>
        <InfiniteList
          items={[...products.values()]}
          ItemComponent={ProductCardMemoized}
          FallbackComponent={FallbackMemoized}
          onScrollEnd={onScrollEnd}
        />
      </div>
      {manualLoading ? (
        <Button
          label="Загрузить еще"
          className={$style['product-list-more-button']}
          disabled={pending}
          onClick={loadProducts}
        />
      ) : null}
    </>
  );
};
