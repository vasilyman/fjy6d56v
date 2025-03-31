import { type WithSlice, type PayloadAction, buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import rootReducer from 'src/app/store/reducers';
import { accountService } from './api';
import { AppState } from 'src/app/store';
import type { TAccount, TOrderPosition } from './type';
import { TProduct } from '../product';
// import uniqueId from 'lodash/uniqueId';

const STORAGE_KEY_ACCOUNT = 'account';

type TAccountMappedOrders = Partial<Omit<TAccount, 'orderPositions'>> & {
  /** map of card positions keyed by productId */
  orderPositions: Record<string, TOrderPosition>;
};

export type AccountState = {
  loading: boolean;
} & TAccountMappedOrders;

const getStorageData = (): TAccountMappedOrders => {
  let data: TAccountMappedOrders = {
    id: null,
    customer: null,
    basePriceTotal: null,
    discount: null,
    salePriceTotal: null,
    orderPositions: null,
  };

  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY_ACCOUNT)) ?? {};
  } catch (e) {
    //
  }

  return data;
};

const storageData = getStorageData();

const initialState = {
  loading: false,
  id: storageData.id,
  customer: storageData.customer,
  basePriceTotal: storageData.basePriceTotal,
  discount: storageData.discount,
  salePriceTotal: storageData.salePriceTotal,
  orderPositions: storageData.orderPositions,
} satisfies AccountState as AccountState;

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: (create) => ({
    updateCountProduct: create.reducer((state, action: PayloadAction<{ product: TProduct; count: number }>) => {
      if (!state.orderPositions) state.orderPositions = {};

      if (action.payload.count === 0 && state.orderPositions?.[action.payload.product.id]) {
        delete state.orderPositions[action.payload.product.id];
        return;
      }

      if (state.orderPositions?.[action.payload.product.id]) {
        state.orderPositions[action.payload.product.id].qty = action.payload.count;
        return;
      }

      const newPosition: TOrderPosition = {
        order: 0,
        product: action.payload.product,
        qty: action.payload.count,
        basePriceTotal: action.payload.product.sum,
        discount: 0,
        salePriceTotal: action.payload.product.sum,
      };
      state.orderPositions[action.payload.product.id] = newPosition;
    }),
    deleteProduct: create.reducer((state, action: PayloadAction<string>) => {
      if (!state.orderPositions?.[action.payload]) return;
      delete state.orderPositions[action.payload];
    }),
    fetchAccount: create.asyncThunk(
      async (id: string): Promise<TAccount> => {
        const res = await accountService.getByCocustomerId(id);
        return res;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.id = action.payload.id;
          state.customer = action.payload.customer;
          state.basePriceTotal = action.payload.basePriceTotal;
          state.discount = action.payload.discount;
          state.salePriceTotal = action.payload.salePriceTotal;

          const orderPositionsMap: TAccountMappedOrders['orderPositions'] = {};
          for (const position of action.payload.orderPositions) {
            orderPositionsMap[position.product.id] = position;
          }
          state.orderPositions = orderPositionsMap;

          // localStorage.setItem(STORAGE_KEY_ACCOUNT, JSON.stringify(action.payload));
        },
      }
    ),
    // TODO add method for combine storageData with data from API
  }),
});

declare module 'src/app/store/reducers' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface LazyLoadedSlices extends WithSlice<typeof accountSlice> {}
}

const withAccount = rootReducer.inject(accountSlice);

export const accountActions = accountSlice.actions;

export const accountSelectors = {
  getOrderPositions: withAccount.selector((state: AppState) => {
    return state.account?.orderPositions;
  }),
  getTotalCount: withAccount.selector((state: AppState) => {
    let totalCount = 0;
    const orderPositions = state.account?.orderPositions;
    if (!orderPositions) return totalCount;

    Object.keys(orderPositions).forEach((key) => {
      totalCount += orderPositions[key].qty;
    });
    return totalCount;
  }),
};
