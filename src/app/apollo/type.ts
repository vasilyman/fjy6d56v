type ResponsePagination = {
  pageSize?: number;
  pageNumber?: number;
  total?: number;
};

type SortType = 'ASC' | 'DESC';
type SortField = 'id' | 'createdAt' | 'updatedAt' | 'date' | 'name';

type Sorting = {
  type?: SortType;
  field?: SortField;
};

type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};

type Product = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  oldPrice?: number;
  price: number;
  category: Category;
};

type ProductsResponse = {
  data: Product[];
  pagination?: ResponsePagination;
  sorting?: Sorting;
};

type ProductQueries = {
  // getOne?: Product;
  getMany?: ProductsResponse;
};

export type Query = {
  products?: ProductQueries;
};

type DateRange = {
  gte: Date;
  lte: Date;
};

type SortingInput = {
  type: SortType;
  field: SortField;
};

type PaginationInput = {
  pageSize: number;
  pageNumber: number;
};

export type ProductGetManyInput = {
  name?: string;
  ids?: string;
  categoryIds?: string[];
  pagination?: PaginationInput;
  sorting?: SortingInput;
  createdAt?: DateRange;
  updatedAt?: DateRange;
};
