import { type WithSlice, buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import rootReducer from 'src/app/store/reducers';
import profileService from './api';
import type { TUpdateProfileDTO, TProfile } from './type';
import { AppState } from 'src/app/store';

export type ProfileState = {
  loading: boolean;
} & TProfile;

const initialState = {
  loading: false,
  id: null,
  username: null,
  firstname: null,
  lastname: null,
  about: null,
} satisfies ProfileState as ProfileState;

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: (create) => ({
    fetchMe: create.asyncThunk(
      async (): Promise<TProfile> => {
        const res = await profileService.getMe('0');
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
          state.username = action.payload.username;
          state.firstname = action.payload.firstname;
          state.lastname = action.payload.lastname;
          state.about = action.payload.about;
        },
      }
    ),
    updateProfile: create.asyncThunk(
      async (profile: TUpdateProfileDTO): Promise<TProfile> => {
        const res = await profileService.updateProfile(profile);
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
          state.username = action.payload.username;
          state.firstname = action.payload.firstname;
          state.lastname = action.payload.lastname;
          state.about = action.payload.about;
        },
      }
    ),
    reset: create.reducer(() => initialState),
  }),
});

declare module 'src/app/store/reducers' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface LazyLoadedSlices extends WithSlice<typeof profileSlice> {}
}

const withProfile = rootReducer.inject(profileSlice);

export const profileActions = profileSlice.actions;

export const profileSelectors = {
  getName: withProfile.selector((state: AppState): string => {
    return state.profile?.firstname || state.profile?.username;
  }),
  getIsLoading: withProfile.selector((state: AppState): boolean => {
    return state.profile?.loading;
  }),
  getProfile: withProfile.selector((state: AppState): TProfile => {
    return state.profile;
  }),
};
