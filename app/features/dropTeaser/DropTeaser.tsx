import React from 'react';
import { Box, Button } from '@material-ui/core';
import Lottie, { Options } from 'react-lottie';
import { ipcRenderer } from 'electron';
import { useSelector, useDispatch } from 'react-redux';
import * as animationData from './5364-drag-drop-upload.json';
import { show } from '../../slices/loadingSlice';

interface Props {
  mode?: 'single' | 'multiple';
}

// eslint-disable-next-line react/prop-types
const FileList: React.FC<Props> = ({ mode }) => {
  const dispatch = useDispatch();
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: (animationData as any).default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  };
  return (
    <Box
      style={{ height: '100%' }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={false}
        isPaused={false}
        isClickToPauseDisabled
      />
      <Box
        display="flex"
        p={1}
        bgcolor="background.default"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          component="span"
          fontSize="h6.fontSize"
          color="text.primary"
          style={{ paddingBottom: 3 }}
        >
          {mode === 'multiple' && 'Drop files here or'}
          {mode === 'single' && 'Drop file here or'}
        </Box>
        <Button
          size="medium"
          color="secondary"
          onClick={() => {
            dispatch(show());
            if (mode === 'multiple') {
              ipcRenderer.send('select-file', null);
            } else {
              ipcRenderer.send('select-file-single', null);
            }
          }}
        >
          {mode === 'multiple' && 'Select Files'}
          {mode === 'single' && 'Select File'}
        </Button>
      </Box>
    </Box>
  );
};

FileList.defaultProps = { mode: 'multiple' };
export default FileList;
