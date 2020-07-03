import React from 'react';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import { selectLoading } from '../../slices/loadingSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  mode?: 'auto' | 'manual';
}

// eslint-disable-next-line react/prop-types
const LoadingComponent: React.FC<Props> = ({ mode }) => {
  const classes = useStyles();
  const currentVisibility = useSelector(selectLoading);

  return (
    <Backdrop
      className={classes.backdrop}
      open={mode === 'auto' ? true : currentVisibility}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

LoadingComponent.defaultProps = {
  mode: 'manual',
};

export default LoadingComponent;
