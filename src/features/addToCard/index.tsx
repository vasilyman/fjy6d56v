import React, { FC, useMemo } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';
import { Button, NumberInput } from '../../shared';
import { useAddProductToCartMutation, useGetCartQuery } from 'src/entities/cart/store';
import { TProduct } from 'src/entities/product';

interface AddToCardProps {
  className?: string;
  block?: boolean;
  disabled?: boolean;
  product: TProduct;
}
/**
 * Primary UI component for user interaction
 */

export const AddToCard: FC<AddToCardProps> = ({ className, block, disabled, product }) => {
  const [addToCart] = useAddProductToCartMutation();
  const { data: cart } = useGetCartQuery(null);

  const count = useMemo(() => {
    return cart?.find((item) => item.id === product.id)?.qty ?? 0;
  }, [cart, product.id]);

  const onUpdateCount = (newCount: number) => {
    const qty = newCount - count;
    addToCart([{ id: product.id, qty }]);
  };

  const onAdd = () => {
    onUpdateCount(count + 1);
  };
  return (
    <div className={cn($style['add-to-card'], className, { [$style['add-to-card_block']]: block })}>
      {count === 0 ? (
        <Button label="В корзину" disabled={disabled} block onClick={onAdd} />
      ) : (
        <NumberInput value={count} onInput={onUpdateCount} min={0} block />
      )}
    </div>
  );
};
