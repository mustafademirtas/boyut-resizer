/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import {
  Container,
  Grid,
  Button,
  Box,
  Divider,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { ipcRenderer, remote } from 'electron';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {
  ImageViewer,
  SizeListInput,
  MultiSizeDropContainer,
  DropTeaser,
  LoadingComponent,
  ResizePresetInput,
  ResizeFillBackgroundInput,
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
    settingsRoot: {
      backgroundColor: theme.palette.background.paper,
      height: '100%',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  })
);

const boxMargin = 1;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const MultipleSize: React.FC<Props> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const {
    file,
    sizes,
    preset,
    allowFillColor,
    backgroundFillColor,
  } = useSelector(selectMultipleResizeSlice);

  const handleFileRead = (
    event: Electron.IpcRendererEvent,
    message: IImageInfo
  ) => {
    if (message) {
      dispatch(setFile(message));
    }

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
      preset,
      allowFillColor,
      backgroundFillColor,
    };

    return message;
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container spacing={0} className={classes.root}>
        <MultiSizeDropContainer>
          {file ? <ImageViewer source={file} /> : <DropTeaser mode="single" />}
        </MultiSizeDropContainer>

        <Grid item xs={4} sm={4} className={classes.settingsRoot}>
          <Box
            paddingTop={1}
            paddingRight={1}
            paddingLeft={1}
            paddingBottom={1}
          >
            <Box marginBottom={2}>
              <ResizePresetInput />
            </Box>

            <Box marginBottom={2}>
              <Button
                variant="contained"
                color="inherit"
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
            <Divider />
            <Box marginTop={1}>
              <Typography component="div" gutterBottom>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Box fontSize="1rem" color="text.primary" marginRight={1}>
                    Background Fill
                  </Box>
                  <Tooltip title="Just for png images" arrow>
                    <HelpOutlineIcon style={{ color: '#fff' }} />
                  </Tooltip>
                </Box>
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <ResizeFillBackgroundInput mode="single" />
            </Box>
            <Divider />
            <Box>
              <SizeListInput />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <LoadingComponent />
    </Container>
  );
};

export default MultipleSize;
