import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../store';

type SliceState = {
  bgImage: string;
};

const setPersistAppSettings = (state: any): any => {
  localStorage.setItem('AppSettings', JSON.stringify(state));
};

const getPersistAppSettings = (): SliceState => {
  const stateStr = localStorage.getItem('AppSettings');
  if (stateStr) return JSON.parse(stateStr);
  return {
    bgImage: 'bg.jpg',
  };
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState: getPersistAppSettings() as SliceState,
  reducers: {
    setBgImage: (state, action) => {
      state.bgImage = action.payload;
      setPersistAppSettings(state);
    },
  },
});

export const { setBgImage } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;

export const selectAppSettings = (state: RootState) => state.appSettings;
