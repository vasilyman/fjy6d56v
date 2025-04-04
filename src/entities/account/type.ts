import type { TCustomer } from '../customer';
import type { TProduct } from '../product';

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
