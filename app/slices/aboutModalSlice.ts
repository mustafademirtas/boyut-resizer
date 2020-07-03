import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../store';

type SliceState = {
  visible: boolean;
};

const aboutModalSlice = createSlice({
  name: 'aboutModal',
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

export const { hide, show } = aboutModalSlice.actions;

export default aboutModalSlice.reducer;

export const selectAboutModal = (state: RootState) => state.aboutModal.visible;
