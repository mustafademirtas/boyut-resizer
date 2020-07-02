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
  Snackbar,
  Tooltip,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Swal from 'sweetalert2';

import { IImageInfo } from '../interfaces/IImageInfo';

import FileList from '../features/fileList/FileList';
import DropTeaser from '../features/dropTeaser/DropTeaser';
import ResizeDimensionInput from '../features/resizeDimensionInput/ResizeDimensionInput';
import ResizeFitInput from '../features/resizeFitInput/ResizeFitInput';
import ResizeQualityInput from '../features/resizeQualityInput/ResizeQualityInput';
import DropContainer from '../features/dropContainer/DropContainer';

import {
  setFileInfos,
  selectFileList,
} from '../features/fileList/fileListSlice';

import { selectResize } from '../slices/resizeSlice';
import { IResizeInput } from '../interfaces/IResizeInput';
import ResizeFillBackgroundInput from '../features/resizeFillBackgroundInput/resizeFillBackgroundInput';

import styles from './Main.css';
// import routes from '../constants/routes.json';

function Alert(props: AlertProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function isInteger(value: string): boolean {
  const parsed = parseInt(value, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(parsed)) {
    return false;
  }
  return true;
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  // onOpen: (toast) => {
  //   toast.addEventListener('mouseenter', Swal.stopTimer);
  //   toast.addEventListener('mouseleave', Swal.resumeTimer);
  // },
});

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
    // settingsRoot: {
    //   backgroundColor: '#f5f5f5',
    //   height: '100%',
    //   overflowY: 'scroll',
    // },
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

export default function Main(): JSX.Element {
  const dispatch = useDispatch();
  const fileList = useSelector(selectFileList);
  const resizeOpts = useSelector(selectResize);
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleFileRead = (
    event: Electron.IpcRendererEvent,
    message: IImageInfo[]
  ) => {
    dispatch(setFileInfos(message));
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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
    return () => {
      ipcRenderer.removeListener('file-read', handleFileRead);
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </Container>
  );
}
