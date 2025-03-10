import type { EProductType } from '../productType';

export type TProduct = {
  id: string;
  type: EProductType;
  title: string;
  description?: string;
  imgUrl?: string;
  sum: number;
};
