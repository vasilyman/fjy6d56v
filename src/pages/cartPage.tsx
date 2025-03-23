import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { accountService } from 'src/entities/account';
import { Container } from 'src/shared/container';
import { firstUppercase } from 'src/shared/lib/firstUppercase';
import { type CartItem, CartList } from 'src/widgets/cartList';

export const CartPage = () => {
  const { t } = useTranslation();

  const [cartList, setCartList] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchList = async (id: string) => {
      const res = await accountService.getByCocustomerId(id);
      setCartList(
        res.orderPositions.map((item) => ({
          id: item.product.id,
          sum: item.salePriceTotal,
          title: item.product.title,
          qty: item.qty,
          description: item.product.description,
        }))
      );
    };

    fetchList('0');
  }, []);

  const onUpdateItem = (id: string, cartItem: Partial<CartItem> | null) => {
    setCartList((items) => {
      const itemId = items.findIndex((item) => item.id === id);

      if (cartItem === null) {
        const newItems = [...items];
        newItems.splice(itemId, 1);
        return newItems;
      }

      const item = items[itemId];
      if (!item) return items;

      Object.keys(cartItem).forEach((key: keyof CartItem) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        item[key] = cartItem[key];
      });

      return [...items];
    });
  };

  return (
    <main>
      <Container>
        <h1>{firstUppercase(t('translation:cartPageTitle'))}</h1>
      </Container>
      <Container>
        <CartList
          items={cartList}
          onInput={(id, qty) => onUpdateItem(id, { qty })}
          onDelete={(id) => onUpdateItem(id, null)}
        />
      </Container>
    </main>
  );
};
