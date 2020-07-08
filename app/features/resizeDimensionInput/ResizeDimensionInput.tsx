import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
  selectResize,
  setHeight,
  setWidth,
  setDontResize,
} from '../../slices/resizeSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '100%',
    },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ResizeDimensionInput: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { width, height, dontResize } = useSelector(selectResize);

  const checkMaxLength = (val: string) => {
    return val.length <= 4;
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!checkMaxLength(event.target.value)) return;
    dispatch(setWidth(event.target.value));
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!checkMaxLength(event.target.value)) return;
    dispatch(setHeight(event.target.value));
  };

  const handleDontResize = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      dispatch(setHeight(''));
      dispatch(setWidth(''));
    }
    dispatch(setDontResize(checked));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <TextField
          label="Width"
          className={classes.textField}
          value={width}
          onChange={handleWidthChange}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          size="small"
          disabled={dontResize}
          color="secondary"
        />
      </Grid>
      <Grid item xs>
        <TextField
          label="Height"
          className={classes.textField}
          value={height}
          onChange={handleHeightChange}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          size="small"
          disabled={dontResize}
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Checkbox
              checked={dontResize}
              onChange={handleDontResize}
              color="secondary"
              size="small"
            />
          }
          label={
            <Typography color="textSecondary">Don&apos;t Resize</Typography>
          }
        />
      </Grid>
    </Grid>
  );
};

export default ResizeDimensionInput;
