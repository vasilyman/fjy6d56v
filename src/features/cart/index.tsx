import React, { FC, useContext, useMemo } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { ThemeContext } from 'src/app/theme';
import { ButtonIcon } from 'src/shared/buttonIcon';
import { useTranslation } from 'react-i18next';
import { useGetCartQuery } from 'src/entities/cart/store';

interface Props {
  className?: string;
}
/**
 * Primary UI component for user interaction
 */
export const CartIcon: FC<Props> = ({ className }) => {
  const { data: cart } = useGetCartQuery(null);
  const count = useMemo(() => {
    return (
      cart?.reduce((acc, cur) => {
        acc += cur.qty;
        return acc;
      }, 0) ?? 0
    );
  }, [cart]);

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const colorClass = theme === 'dark' ? $style['cart-icon_color-white'] : $style['cart-icon_color-black'];

  return (
    <ButtonIcon
      className={cn($style['cart-icon'], className, colorClass)}
      color={theme === 'dark' ? 'black' : 'white'}
      icon="cart-shopping"
      to="/cart"
    >
      {t('translation:cart')}
      <div className={$style['cart-icon__count']}>{count}</div>
    </ButtonIcon>
  );
};
