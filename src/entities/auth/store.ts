import { type WithSlice, buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import rootReducer from 'src/app/store/reducers';
import authService from './api';
import { GetTokensRequestDTO } from './type';
import { AppState } from 'src/app/store';
import { EAuthPermissions, EAuthRoles } from './const';
import { ServerErrors } from '../apiError/type';
import { AxiosError } from 'axios';

export interface AuthState {
  loading: boolean;
  access: string | null;
  isAuthenticated: boolean;
  role: EAuthRoles;
  permissions: EAuthPermissions[];
}

const STORAGE_KEY_ACCESS_TOKEN = 'access_token';

const parseJWT = (token: string): Pick<AuthState, 'role' | 'permissions'> => {
  if (typeof token !== 'string')
    return {
      role: EAuthRoles.ANON,
      permissions: [],
    };
  const isAdmin = token.includes('admin');
  return {
    role: isAdmin ? EAuthRoles.ADMIN : EAuthRoles.CUSTOMER,
    permissions: isAdmin ? [EAuthPermissions.CAN_EDIT_PRODUCT] : [],
  };
};

const tokeFromStorage = localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
const { role: initialRole, permissions: initialPerms } = parseJWT(tokeFromStorage);

const initialState = {
  access: localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN),
  loading: false,
  isAuthenticated: typeof tokeFromStorage === 'string',
  role: initialRole,
  permissions: initialPerms,
} satisfies AuthState as AuthState;

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    fetchTokens: create.asyncThunk<string, GetTokensRequestDTO, { rejectValue: ServerErrors }>(
      async ({ username, password }, { rejectWithValue }) => {
        const res = await authService.getTokens({ username, password }).catch((err: AxiosError<ServerErrors>) => {
          return rejectWithValue(err.response.data);
        });
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
          state.isAuthenticated = true;
          const { role, permissions } = parseJWT(action.payload);
          state.role = role;
          state.permissions = permissions;
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
          state.isAuthenticated = false;
          state.role = EAuthRoles.ANON;
          state.permissions = [];
          localStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN);
        },
      }
    ),
    signup: create.asyncThunk<string, GetTokensRequestDTO, { rejectValue: ServerErrors }>(
      async ({ username, password }, { rejectWithValue }) => {
        const res = await authService.signUp({ email: username, password }).catch((err: AxiosError<ServerErrors>) => {
          return rejectWithValue(err.response.data);
        });
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
          state.isAuthenticated = true;
          const { role, permissions } = parseJWT(action.payload);
          state.role = role;
          state.permissions = permissions;
          localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, action.payload);
        },
      }
    ),
  }),
});

declare module 'src/app/store/reducers' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface LazyLoadedSlices extends WithSlice<typeof authSlice> {}
}

const withAuth = rootReducer.inject(authSlice);

export const authActions = authSlice.actions;

export const authSelectors = {
  getAccess: withAuth.selector((state: AppState): string => {
    return state.auth?.access;
  }),
  getIsLoading: withAuth.selector((state: AppState): boolean => {
    return state.auth?.loading;
  }),
  isAuthenticated: withAuth.selector((state: AppState): boolean => {
    return state.auth?.isAuthenticated;
  }),
  getPermissions: withAuth.selector((state: AppState): AuthState['permissions'] => {
    return state.auth?.permissions;
  }),
};
