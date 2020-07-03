import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import { IImageInfo } from '../interfaces/IImageInfo';
import { ISize } from '../interfaces/ISize';
import checkDigit from '../utils/checkDigit';

type SliceState = {
  file: IImageInfo | undefined;
  sizes: ISize[];
};

const multipleResizeSlice = createSlice({
  name: 'multipleResize',
  initialState: {
    file: undefined,
    sizes: [{ width: '', height: '', id: v4() }],
  } as SliceState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload;
    },
    removeSize: (state, action) => {
      const fDims = state.sizes.filter((x) => x.id !== action.payload);
      state.sizes = fDims;
    },
    addSize: (state) => {
      const newDim = { width: '', height: '', id: v4() };
      const dims = Array.from(state.sizes);
      dims.push(newDim);
      state.sizes = dims;
    },
    changeSizeWidth: (state, action) => {
      if (!checkDigit(action.payload.value)) return;
      const i = state.sizes.findIndex((x) => x.id === action.payload.id);
      const dims = Array.from(state.sizes);
      dims[i].width = action.payload.value;
      state.sizes = dims;
    },
    changeSizeHeight: (state, action) => {
      if (!checkDigit(action.payload.value)) return;
      const i = state.sizes.findIndex((x) => x.id === action.payload.id);
      const dims = Array.from(state.sizes);
      dims[i].height = action.payload.value;
      state.sizes = dims;
    },
  },
});

export const {
  setFile,
  removeSize,
  changeSizeWidth,
  changeSizeHeight,
  addSize,
} = multipleResizeSlice.actions;

export default multipleResizeSlice.reducer;

export const selectMultipleResizeSlice = (state: RootState) =>
  state.multipleResize;
