import { TProduct } from '../product';

export type TOrderProduct = {
  id: string;
  product: Pick<TProduct, 'title' | 'id' | 'imgUrl'>;
  qty: number;
};

export type TOrder = {
  id: string;
  status: string;
  products: TOrderProduct[];
};
