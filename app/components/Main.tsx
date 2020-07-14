import React from 'react';
import { ipcRenderer, remote } from 'electron';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Divider,
  Tooltip,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { IImageInfo } from '../interfaces/IImageInfo';

import Toast from '../utils/toast';

import {
  LoadingComponent,
  ResizeOtherOptionsInput,
  FileList,
  DropTeaser,
  ResizeDimensionInput,
  ResizeFitInput,
  ResizeQualityInput,
  DropContainer,
  ResizeFillBackgroundInput,
} from '../features';

import {
  setFileInfos,
  selectFileList,
} from '../features/fileList/fileListSlice';
import { show, hide } from '../slices/loadingSlice';
import { selectResize } from '../slices/resizeSlice';

import { IResizeInput } from '../interfaces/IResizeInput';
import { iosPresetNames } from '../utils/iconPreset';

// import routes from '../constants/routes.json';

function isInteger(value: string): boolean {
  const parsed = parseInt(value, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(parsed)) {
    return false;
  }
  return true;
}

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

const Main: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const fileList = useSelector(selectFileList);
  const resizeOpts = useSelector(selectResize);
  const classes = useStyles();

  const handleFileRead = (
    event: Electron.IpcRendererEvent,
    message: IImageInfo[]
  ): void => {
    if (message) {
      dispatch(setFileInfos(message));
    }

    dispatch(hide());
  };

  const handleResizeDone = (): void => {
    dispatch(hide());
  };

  const validateResizeInputs = (): boolean => {
    if (resizeOpts.dontResize) return true;

    const isWidthNumber = isInteger(resizeOpts.width);
    const isHeightNumber = isInteger(resizeOpts.height);

    return isWidthNumber || isHeightNumber;
  };

  const validateResizeElementExist = (): boolean => {
    if (fileList.length <= 0) {
      return false;
    }
    return true;
  };

  const prepareResizeOptions = async (skipFolderPath = false) => {
    let isValid = false;
    isValid = validateResizeElementExist();
    if (!isValid) {
      Toast.fire({
        icon: 'error',
        title: 'Pick files',
      });
      return null;
    }
    isValid = validateResizeInputs();
    if (!isValid) {
      Toast.fire({
        icon: 'error',
        title: 'Check resize values',
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

    const message: IResizeInput = {
      width: parseInt(resizeOpts.width, 10),
      height: parseInt(resizeOpts.height, 10),
      infos: fileList,
      destinationPath,
      fit: resizeOpts.fit,
      quality: resizeOpts.quality,
      backgroundFillColor: resizeOpts.backgroundFillColor,
      allowFillColor: resizeOpts.allowFillColor,
      dontResize: resizeOpts.dontResize,
      removeExifData: resizeOpts.removeExifData,
    };
    return message;
  };

  React.useEffect(() => {
    iosPresetNames();
    ipcRenderer.on('file-read', handleFileRead);
    ipcRenderer.on('resize-done', handleResizeDone);

    return () => {
      dispatch(hide());
      ipcRenderer.removeListener('file-read', handleFileRead);
      ipcRenderer.removeListener('resize-done', handleResizeDone);
    };
  }, []);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container spacing={0} className={classes.root}>
        <DropContainer>
          {fileList.length > 0 && <FileList data={fileList} />}
          {fileList.length <= 0 && <DropTeaser />}
        </DropContainer>

        <Grid item xs={4} sm={4} className={classes.settingsRoot}>
          <Typography component="div">
            <Box fontSize="1rem" m={boxMargin} color="text.primary">
              Resize Dimension
            </Box>
          </Typography>
          <Box m={boxMargin}>
            <ResizeDimensionInput />
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              size="small"
              onClick={async () => {
                const result = await prepareResizeOptions();
                if (result) ipcRenderer.send('resize-request', result);
              }}
            >
              Resize
            </Button>
          </Box>
          <Divider />
          <Typography component="div">
            <Box fontSize="1rem" m={boxMargin} color="text.primary">
              Fit Method
            </Box>
          </Typography>
          <Box m={boxMargin}>
            <ResizeFitInput />
          </Box>
          <Divider />
          <Typography component="div" gutterBottom>
            <Box fontSize="1rem" m={boxMargin} color="text.primary">
              Quality
            </Box>
          </Typography>
          <Box m={boxMargin}>
            <ResizeQualityInput />
          </Box>
          <Divider />
          <Typography component="div" gutterBottom>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              m={boxMargin}
            >
              <Box fontSize="1rem" color="text.primary" marginRight={1}>
                Background Fill
              </Box>
              <Tooltip title="Just for png images" arrow>
                <HelpOutlineIcon style={{ color: '#fff' }} />
              </Tooltip>
            </Box>
          </Typography>
          <Box m={boxMargin}>
            <ResizeFillBackgroundInput />
          </Box>
          <Divider />
          <Typography component="div" gutterBottom>
            <Box fontSize="1rem" m={boxMargin} color="text.primary">
              Other Options
            </Box>
          </Typography>
          <Box m={boxMargin}>
            <ResizeOtherOptionsInput />
          </Box>
        </Grid>
      </Grid>
      <LoadingComponent />
    </Container>
  );
};

export default Main;
