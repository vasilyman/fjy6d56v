import { TCart } from './type';

const CART_KEY = 'cart';

class CartService {
  getCart(): Promise<{ data: TCart[] }> {
    const productIds: TCart[] = JSON.parse(localStorage.getItem(CART_KEY));
    return Promise.resolve({ data: productIds });
  }
  addProductsToCart(products: TCart[]): Promise<{ data: TCart[] }> {
    const productIds: TCart[] = JSON.parse(localStorage.getItem(CART_KEY)) ?? [];
    const productIdsMap = Object.fromEntries(productIds.map((item) => [item.id, item]));

    products.forEach((product) => {
      if (product.id in productIdsMap) {
        productIdsMap[product.id].qty += product.qty;
      } else {
        productIdsMap[product.id] = { ...product };
      }

      if (productIdsMap[product.id].qty <= 0) {
        delete productIdsMap[product.id];
      }
    });
    localStorage.setItem(CART_KEY, JSON.stringify(Object.values(productIdsMap)));
    return Promise.resolve({ data: products });
  }
  removeProductsFromCart(products: TCart[]): Promise<{ data: TCart[] }> {
    const productIds: TCart[] = JSON.parse(localStorage.getItem(CART_KEY));

    const productsToRemoveMap = Object.fromEntries(products.map((item) => [item.id, item]));

    for (let i = 0; i < productIds.length; i++) {
      if (productIds[i].id in productsToRemoveMap) {
        const newQty = productIds[i].qty - productsToRemoveMap[productIds[i].id].qty;
        if (newQty > 0) {
          productIds[i].qty = newQty;
        } else {
          delete productIds[i];
        }
      }

      if (Object.keys(productsToRemoveMap).length === 0) break;
    }

    localStorage.setItem(CART_KEY, JSON.stringify(productIds.filter((item) => item !== null)));
    return Promise.resolve({ data: products });
  }
}

export default new CartService();
