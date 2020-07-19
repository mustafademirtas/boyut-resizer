import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Container, Grid, Box, Typography, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { LoadingComponent, BgImageSelectInput } from '../features';

import { show, hide } from '../slices/loadingSlice';
import { selectAppSettings, setBgImage } from '../slices/appSettingsSlice';

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
      height: 'calc(100vh - 78px)',
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
      width: '100%',
      // backgroundColor: theme.palette.background.paper,
      backgroundColor: 'transparent',
      height: '100%',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      backdropFilter: 'blur(20px)',
    },
  })
);

const boxMargin = 1;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Main: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const appSettings = useSelector(selectAppSettings);
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container spacing={0} className={classes.root}>
        <Box m={1} p={1} className={classes.settingsRoot}>
          <Typography variant="h5" gutterBottom>
            PREFERENCES
          </Typography>
          {/* <Divider /> */}
          <Typography variant="h6" gutterBottom>
            Background
          </Typography>
          <Divider />
          <BgImageSelectInput />
        </Box>
      </Grid>
      <LoadingComponent />
    </Container>
  );
};

export default Main;
