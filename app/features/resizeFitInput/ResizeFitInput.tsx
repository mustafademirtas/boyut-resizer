import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core';
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

const ResizeFitInput: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { fit } = useSelector(selectResize);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFit(event.target.value));
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="fit"
        name="resizeFitRadios"
        value={fit}
        onChange={handleChange}
      >
        <FormControlLabel
          value="contain"
          control={<Radio size="small" />}
          label={<Typography color="textSecondary">Contain</Typography>}
        />
        <FormControlLabel
          value="cover"
          control={<Radio size="small" />}
          label={<Typography color="textSecondary">Cover</Typography>}
        />
        <FormControlLabel
          value="fill"
          control={<Radio size="small" />}
          label={<Typography color="textSecondary">Fill</Typography>}
        />
        <FormControlLabel
          value="inside"
          control={<Radio size="small" />}
          label={<Typography color="textSecondary">Inside</Typography>}
        />
        <FormControlLabel
          value="outside"
          control={<Radio size="small" />}
          label={<Typography color="textSecondary">Outside</Typography>}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ResizeFitInput;
