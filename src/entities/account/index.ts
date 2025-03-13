import uniqueId from 'lodash/uniqueId';
import type { TCustomer } from '../customer';
import { ECustomerType } from '../customerType';
import type { TProduct } from '../product';
import { EProductType } from '../productType';

export type TOrderPositionRequest = {
  order: number;
  product: TProduct;
  qty: number;
};

export type TOrderPosition = {
  order: number;
  product: TProduct;
  qty: number;
  basePriceTotal: number;
  discount: number;
  salePriceTotal: number;
};

export type TAccountRequest = {
  customer: TCustomer;
  orderPositions: TOrderPositionRequest[];
};

export type TAccount = {
  id: string;
  customer: TCustomer;
  basePriceTotal: number;
  discount: number;
  salePriceTotal: number;
  orderPositions: TOrderPosition[];
};

/** in percent */
const discountMatrixPercent: Record<ECustomerType, Record<EProductType, number>> = {
  [ECustomerType.STANDARD]: {
    [EProductType.CAR]: 0,
    [EProductType.FOOD]: 0,
    [EProductType.TOY]: 0,
  },
  [ECustomerType.PREMIUM]: {
    [EProductType.CAR]: 2,
    [EProductType.FOOD]: 5,
    [EProductType.TOY]: 10,
  },
  [ECustomerType.GOLD]: {
    [EProductType.CAR]: 5,
    [EProductType.FOOD]: 10,
    [EProductType.TOY]: 15,
  },
  [ECustomerType.FREE]: {
    [EProductType.CAR]: 100,
    [EProductType.FOOD]: 100,
    [EProductType.TOY]: 100,
  },
};

/** internal backend method */
const getDiscountPercent = (customerType: ECustomerType, productType: EProductType): number => {
  return discountMatrixPercent[customerType][productType];
};

/** internal backend method */
const calcOrderPosition = (orderPosition: TOrderPositionRequest, customerType: ECustomerType): TOrderPosition => {
  const basePriceTotal = orderPosition.product.sum * orderPosition.qty;
  const discount = basePriceTotal * (getDiscountPercent(customerType, orderPosition.product.type) / 100);
  const salePriceTotal = basePriceTotal - discount;
  return {
    ...orderPosition,
    discount,
    basePriceTotal,
    salePriceTotal,
  };
};

class AccountService {
  /** implemented db */
  _list: TAccount[] = [];

  getListByCocustomerId(id: string): TAccount {
    return this._list.find((item) => item.id === id);
  }

  addAccount(account: TAccountRequest): TAccount {
    const id = uniqueId();
    const orderPositions = account.orderPositions.map((item) => calcOrderPosition(item, account.customer.type));
    let discount = 0;
    let salePriceTotal = 0;
    let basePriceTotal = 0;
    orderPositions.forEach((orderPosition) => {
      discount += orderPosition.discount;
      salePriceTotal += orderPosition.salePriceTotal;
      basePriceTotal += orderPosition.basePriceTotal;
    });
    const newAccount: TAccount = { ...account, id, orderPositions, discount, salePriceTotal, basePriceTotal };
    this._list.push(newAccount);
    return newAccount;
  }

  getDiscountPercent(customerType: ECustomerType, productType: EProductType): number {
    return getDiscountPercent(customerType, productType);
  }

  calcOrderPosition(orderPosition: TOrderPositionRequest, customerType: ECustomerType): TOrderPosition {
    return calcOrderPosition(orderPosition, customerType);
  }
}

export const accountService = new AccountService();
