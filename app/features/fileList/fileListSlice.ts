import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import { IImageInfo } from '../../interfaces/IImageInfo';

type SliceState = { fileInfos: IImageInfo[] };

const fileListSlice = createSlice({
  name: 'fileList',
  initialState: { fileInfos: [] } as SliceState,
  reducers: {
    setFileInfos: (state, action) => {
      state.fileInfos = action.payload;
    },
    removeFileInfo: (state, action) => {
      state.fileInfos = state.fileInfos.filter((x) => x.id !== action.payload);
    },
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
  },
});

export const { setFileInfos, removeFileInfo } = fileListSlice.actions;

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

export default fileListSlice.reducer;

export const selectFileList = (state: RootState) => state.fileList.fileInfos;
