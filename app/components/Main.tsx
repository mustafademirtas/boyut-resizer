import React from 'react';
import { ipcRenderer, remote } from 'electron';
import { Link } from 'react-router-dom';
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

import FileList from '../features/fileList/FileList';
import DropTeaser from '../features/dropTeaser/DropTeaser';
import ResizeDimensionInput from '../features/resizeDimensionInput/ResizeDimensionInput';
import ResizeFitInput from '../features/resizeFitInput/ResizeFitInput';
import ResizeQualityInput from '../features/resizeQualityInput/ResizeQualityInput';
import DropContainer from '../features/dropContainer/DropContainer';
import ResizeFillBackgroundInput from '../features/resizeFillBackgroundInput/resizeFillBackgroundInput';

import {
  setFileInfos,
  selectFileList,
} from '../features/fileList/fileListSlice';
import { show, hide, selectLoading } from '../slices/loadingSlice';
import { selectResize } from '../slices/resizeSlice';

import { IResizeInput } from '../interfaces/IResizeInput';

import { LoadingComponent } from '../features';
import routes from '../constants/routes.json';

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
  ) => {
    dispatch(setFileInfos(message));
    dispatch(hide());
  };

  const handleResizeDone = () => {
    dispatch(hide());
  };

  const validateResizeInputs = () => {
    const isWidthNumber = isInteger(resizeOpts.width);
    const isHeightNumber = isInteger(resizeOpts.height);

    return isWidthNumber || isHeightNumber;
  };

  const validateResizeElementExist = () => {
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
    };
    return message;
  };

  React.useEffect(() => {
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

        <Grid item xs={4} sm={4} className="settings-root">
          <Typography component="div">
            <Box fontSize="1rem" m={boxMargin} color="primary.main">
              Resize Dimension
            </Box>
          </Typography>
          <Box m={boxMargin}>
            <ResizeDimensionInput />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="small"
              onClick={async () => {
                dispatch(show());
                const result = await prepareResizeOptions();
                if (result) ipcRenderer.send('resize-request', result);
              }}
            >
              Resize
            </Button>
          </Box>
          <Divider />
          <Typography component="div">
            <Box fontSize="1rem" m={boxMargin} color="primary.main">
              Fit Method
            </Box>
          </Typography>
          <Box m={boxMargin}>
            <ResizeFitInput />
          </Box>
          <Divider />
          <Typography component="div" gutterBottom>
            <Box fontSize="1rem" m={boxMargin} color="primary.main">
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
              <Box fontSize="1rem" color="primary.main" marginRight={1}>
                Background Fill
              </Box>
              <Tooltip title="Just for png images" arrow>
                <HelpOutlineIcon />
              </Tooltip>
            </Box>
          </Typography>
          <Box m={boxMargin}>
            <ResizeFillBackgroundInput />
          </Box>
        </Grid>
      </Grid>
      <LoadingComponent />
    </Container>
  );
};

export default Main;
