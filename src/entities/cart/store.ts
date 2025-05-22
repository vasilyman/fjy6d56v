import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import cartService from './api';
import type { WithSlice } from '@reduxjs/toolkit';
import rootReducer from 'src/app/store/reducers';
import { addAppMiddleware } from 'src/app/store';
import { TCart } from './type';

export const cartSlice = createApi({
  reducerPath: 'cartSlice',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['cart'],
  endpoints: (build) => ({
    getCart: build.query<TCart[] | undefined, null>({
      queryFn: async () => cartService.getCart(),
      providesTags: ['cart'],
    }),
    addProductToCart: build.mutation({
      queryFn: cartService.addProductsToCart,
      invalidatesTags: ['cart'],
    }),
    removeProductFromCart: build.mutation({
      queryFn: cartService.removeProductsFromCart,
      invalidatesTags: ['cart'],
    }),
    clearCart: build.mutation({
      queryFn: cartService.clearCart,
      invalidatesTags: ['cart'],
    }),
  }),
});

export const { useGetCartQuery, useAddProductToCartMutation, useRemoveProductFromCartMutation, useClearCartMutation } =
  cartSlice;

declare module 'src/app/store/reducers' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface LazyLoadedSlices extends WithSlice<typeof cartSlice> {}
}

rootReducer.inject(cartSlice);

addAppMiddleware(cartSlice.middleware);
