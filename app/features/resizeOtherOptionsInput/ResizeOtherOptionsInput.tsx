import React from 'react';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectResize, setRemoveExifData } from '../../slices/resizeSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '100%',
    },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IResizeOtherOptionsInputProps {}

const ResizeOtherOptionsInput: React.FC<IResizeOtherOptionsInputProps> = (
  props
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { removeExifData } = useSelector(selectResize);

  const handleRemoveExifData = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    dispatch(setRemoveExifData(checked));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Checkbox
              checked={removeExifData}
              onChange={handleRemoveExifData}
              color="primary"
              size="small"
            />
          }
          label="Clean Exif Data"
        />
      </Grid>
    </Grid>
  );
};

export default ResizeOtherOptionsInput;
