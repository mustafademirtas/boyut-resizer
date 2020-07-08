import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { selectResize, setFit } from '../../slices/resizeSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '100%',
    },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ResizeQualityInput: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { quality } = useSelector(selectResize);

  const handleChange = (event: any, value: number | number[]) => {
    dispatch(setFit(value));
  };

  return (
    <Slider
      defaultValue={quality}
      aria-labelledby="discrete-slider-always"
      step={1}
      min={0}
      max={100}
      valueLabelDisplay="auto"
      onChangeCommitted={handleChange}
      color="secondary"
    />
  );
};

export default ResizeQualityInput;
