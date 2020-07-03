import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../store';

type SliceState = {
  visible: boolean;
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    visible: false,
  } as SliceState,
  reducers: {
    show: (state) => {
      state.visible = true;
    },
    hide: (state) => {
      state.visible = false;
    },
  },
});

export const { hide, show } = loadingSlice.actions;

export default loadingSlice.reducer;

export const selectLoading = (state: RootState) => state.loading.visible;
