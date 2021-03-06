import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../store';
import checkDigit from '../utils/checkDigit';

type SliceState = {
  width: string;
  height: string;
  quality: number;
  fit: string;
  backgroundFillColor: string;
  allowFillColor: boolean;
  dontResize: boolean;
  removeExifData: boolean;
};

const resizeSlice = createSlice({
  name: 'resize',
  initialState: {
    fit: 'cover',
    height: '',
    width: '',
    quality: 80,
    backgroundFillColor: '#fff',
    allowFillColor: false,
    dontResize: false,
    removeExifData: false,
  } as SliceState,
  reducers: {
    setAllowFillColor: (state, action) => {
      state.allowFillColor = action.payload;
    },
    setFit: (state, action) => {
      state.fit = action.payload;
    },
    setWidth: (state, action) => {
      if (checkDigit(action.payload)) {
        state.width = action.payload;
      }
    },
    setHeight: (state, action) => {
      if (checkDigit(action.payload)) {
        state.height = action.payload;
      }
    },
    setQuality: (state, action) => {
      state.quality = action.payload;
    },
    setBackgroundFillColor: (state, action) => {
      state.backgroundFillColor = action.payload;
    },
    setDontResize: (state, action) => {
      state.dontResize = action.payload;
    },
    setRemoveExifData: (state, action) => {
      state.removeExifData = action.payload;
    },
  },
});

export const {
  setFit,
  setHeight,
  setQuality,
  setWidth,
  setBackgroundFillColor,
  setAllowFillColor,
  setDontResize,
  setRemoveExifData,
} = resizeSlice.actions;

// export const incrementIfOdd = (): AppThunk => {
//   return (dispatch, getState) => {
//     const state = getState();
//     if (state.counter.value % 2 === 0) {
//       return;
//     }
//     dispatch(increment());
//   };
// };

// export const incrementAsync = (delay = 1000): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increment());
//   }, delay);
// };

export default resizeSlice.reducer;

export const selectResize = (state: RootState) => state.resize;
