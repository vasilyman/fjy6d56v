import { Tcategory } from '../category/type';

export type TProduct = {
  id: string;
  category: Tcategory;
  title: string;
  description?: string;
  imgUrl?: string;
  sum: number;
  sumBase?: number;
};
