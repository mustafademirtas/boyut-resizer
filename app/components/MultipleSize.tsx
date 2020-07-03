/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { Container, Grid, Button, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { ipcRenderer, remote } from 'electron';
import {
  ImageViewer,
  SizeListInput,
  MultiSizeDropContainer,
  DropTeaser,
  LoadingComponent,
} from '../features';
import {
  selectMultipleResizeSlice,
  setFile,
} from '../slices/multipleResizeSlice';
import { show, hide, selectLoading } from '../slices/loadingSlice';
import { IImageInfo } from '../interfaces/IImageInfo';
import Toast from '../utils/toast';
import { IMultipleSizeResizeInput } from '../interfaces/IMultipleSizeResizeInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
      height: '100vh',
      paddingLeft: 0,
      paddingRight: 0,
    },
    textField: {
      width: '100%',
    },
    fileListRoot: {
      height: '100%',
    },
    fileList: {
      overflowY: 'scroll',
      height: '100%',
      paddingTop: 0,
    },
  })
);

const boxMargin = 1;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const MultipleSize: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { file, sizes } = useSelector(selectMultipleResizeSlice);

  const handleFileRead = (
    event: Electron.IpcRendererEvent,
    message: IImageInfo
  ) => {
    dispatch(setFile(message));
    dispatch(hide());
  };

  const handleResizeDone = () => {
    dispatch(hide());
  };

  React.useEffect(() => {
    ipcRenderer.on('file-read-single', handleFileRead);
    ipcRenderer.on('resize-done', handleResizeDone);
    return () => {
      ipcRenderer.removeListener('file-read-single', handleFileRead);
      ipcRenderer.removeListener('resize-done', handleResizeDone);
    };
  }, []);

  const prepareOptions = async (skipFolderPath = false) => {
    let mSizes = sizes;
    if (!file) {
      Toast.fire({
        icon: 'error',
        title: 'Pick file',
      });
      return null;
    }

    // Filter array which width and height is empty
    mSizes = mSizes.filter((x) => {
      return x.width || x.height;
    });

    if (mSizes.length === 0) {
      Toast.fire({
        icon: 'error',
        title: 'The is none valid size value',
      });
      return null;
    }

    let destinationPath = '';

    if (!skipFolderPath) {
      const result = await remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      });

      if (result.canceled) {
        return null;
      }

      // eslint-disable-next-line prefer-destructuring
      destinationPath = result.filePaths[0];
    }

    const message: IMultipleSizeResizeInput = {
      file,
      sizes: mSizes,
      destinationPath,
    };

    return message;
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container spacing={0} className={classes.root}>
        <MultiSizeDropContainer>
          {file ? <ImageViewer source={file} /> : <DropTeaser mode="single" />}
        </MultiSizeDropContainer>

        <Grid item xs={4} sm={4} className="settings-root">
          <Box
            paddingTop={4}
            paddingRight={1}
            paddingLeft={1}
            paddingBottom={1}
          >
            <Box marginBottom={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="small"
                onClick={async () => {
                  const opts = await prepareOptions();
                  if (opts) {
                    dispatch(show());
                    ipcRenderer.send('resize-request-multi-size', opts);
                  }
                }}
              >
                Resize
              </Button>
            </Box>
            <SizeListInput />
          </Box>
        </Grid>
      </Grid>
      <LoadingComponent />
    </Container>
  );
};

export default MultipleSize;
