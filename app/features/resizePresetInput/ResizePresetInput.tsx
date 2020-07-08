import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMultipleResizeSlice,
  changePreset,
} from '../../slices/multipleResizeSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ResizePresetInput: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { preset } = useSelector(selectMultipleResizeSlice);
  // const [preset, setPreset] = React.useState('custom');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(changePreset(event.target.value));
    // setPreset(event.target.value as string);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel color="secondary" id="preset-select-label">
        Preset
      </InputLabel>
      <Select
        labelId="preset-select-label"
        id="preset-select"
        value={preset}
        onChange={handleChange}
        color="secondary"
      >
        <MenuItem value="custom">Custom</MenuItem>
        <MenuItem value="ios">iOS</MenuItem>
        <MenuItem value="android">Android</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ResizePresetInput;
