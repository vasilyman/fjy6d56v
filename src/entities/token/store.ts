import { type WithSlice, type PayloadAction, buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import rootReducer from 'src/app/store/reducers';
import tokenService from './api';
import { GetTokensRequestDTO } from './type';
import { AppState } from 'src/app/store';

export interface TokenState {
  loading: boolean;
  access: string | null;
}

const STORAGE_KEY_ACCESS_TOKEN = 'access_token';

const initialState = {
  access: localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN),
  loading: false,
} satisfies TokenState as TokenState;

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: (create) => ({
    setAccessToken: create.reducer((state, action: PayloadAction<string>) => {
      state.access = action.payload;
    }),
    fetchTokens: create.asyncThunk(
      async ({ username, password }: GetTokensRequestDTO): Promise<string> => {
        const res = await tokenService.getTokens({ username, password });
        return res as string | null;
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
          state.access = action.payload;
          localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, action.payload);
        },
      }
    ),
    logout: create.asyncThunk(
      async () => {
        // TODO call API method for clear session
        return null;
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
          state.access = action.payload;
          localStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN);
        },
      }
    ),
  }),
});

declare module 'src/app/store/reducers' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface LazyLoadedSlices extends WithSlice<typeof tokenSlice> {}
}

rootReducer.inject(tokenSlice);

export const { setAccessToken, fetchTokens, logout } = tokenSlice.actions;

export const tokenSelectors = {
  getAccess: (state: AppState): AppState['token']['access'] => {
    return state.token.access;
  },
  getIsLoading: (state: AppState): AppState['token']['loading'] => {
    return state.token.loading;
  },
};
