/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import counterReducer from './features/counter/counterSlice';
import fileListReducer from './features/fileList/fileListSlice';
import resizeReducer from './slices/resizeSlice';
import loadingReducer from './slices/loadingSlice';
import multipleResizeSlice from './slices/multipleResizeSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    fileList: fileListReducer,
    resize: resizeReducer,
    loading: loadingReducer,
    multipleResize: multipleResizeSlice,
  });
}
