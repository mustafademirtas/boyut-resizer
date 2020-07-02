import React from 'react';
import { Box, Button } from '@material-ui/core';
import Lottie, { Options } from 'react-lottie';
import { ipcRenderer } from 'electron';
import * as animationData from './5364-drag-drop-upload.json';

export default function FileList() {
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
        bgcolor="background.paper"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          component="span"
          fontSize="h6.fontSize"
          color="primary.main"
          style={{ paddingBottom: 3 }}
        >
          Drop files here or
        </Box>
        <Button
          size="medium"
          color="secondary"
          onClick={() => {
            ipcRenderer.send('select-file', null);
          }}
        >
          Select Files
        </Button>
      </Box>
    </Box>
  );
}
