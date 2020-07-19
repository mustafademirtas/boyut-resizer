import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../store';

type SliceState = {
  bgImage: string;
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState: {
    bgImage: 'bg02.jpg',
  } as SliceState,
  reducers: {
    setBgImage: (state, action) => {
      state.bgImage = action.payload;
    },
  },
});

export const { setBgImage } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;

export const selectappSettings = (state: RootState) => state.appSettings;
