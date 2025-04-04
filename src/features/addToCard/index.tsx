import React, { FC, useMemo } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';
import { Button, NumberInput } from '../../shared';
import { useSelector } from 'react-redux';
import { accountSelectors, accountActions } from 'src/entities/account/store';
import { useAppDispatch } from 'src/app/store';
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
  const orderPositions = useSelector(accountSelectors.getOrderPositions);
  const count = useMemo(() => {
    return orderPositions?.[product.id]?.qty ?? 0;
  }, [orderPositions, product.id]);

  const dispatch = useAppDispatch();
  const onUpdateCount = (count: number) => {
    return dispatch(accountActions.updateCountProduct({ product, count }));
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
