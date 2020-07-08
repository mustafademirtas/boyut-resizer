/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { v4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Box, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
  selectMultipleResizeSlice,
  removeSize,
  changeSizeHeight,
  changeSizeWidth,
  addSize,
} from '../../slices/multipleResizeSlice';

function generate(size: number, element: React.ReactElement) {
  return Array.from({ length: size }, (v, i) => i).map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '100%',
    },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SizeListInput: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sizes, preset } = useSelector(selectMultipleResizeSlice);

  const handleWidthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    dispatch(changeSizeWidth({ id, value: e.target.value }));
  };

  const handleHeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    dispatch(changeSizeHeight({ id, value: e.target.value }));
  };

  const removeDimension = (id: string) => {
    if (sizes.length === 1) return;
    dispatch(removeSize(id));
  };

  return (
    <Box component="div">
      {sizes.map((v, i) => (
        <Box display="flex" key={`dimension-${v.id}`} alignItems="center">
          <Box paddingRight={1}>
            <TextField
              label="Width"
              className={classes.textField}
              value={v.width}
              disabled={preset !== 'custom'}
              onChange={(e) =>
                handleWidthChange(
                  e as React.ChangeEvent<HTMLInputElement>,
                  v.id
                )
              }
              // helperText="Some important text"
              margin="dense"
              variant="outlined"
              size="small"
              color="secondary"
            />
          </Box>
          <Box paddingRight={1}>
            <TextField
              label="Height"
              className={classes.textField}
              value={v.height}
              disabled={preset !== 'custom'}
              onChange={(e) =>
                handleHeightChange(
                  e as React.ChangeEvent<HTMLInputElement>,
                  v.id
                )
              }
              // helperText="Some important text"
              margin="dense"
              variant="outlined"
              size="small"
              color="secondary"
            />
          </Box>
          <Box flexShrink={1}>
            <IconButton
              aria-label="delete"
              disabled={sizes.length === 1 || preset !== 'custom'}
              onClick={() => {
                removeDimension(v.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton
          aria-label="add"
          disabled={preset !== 'custom'}
          onClick={() => {
            dispatch(addSize());
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SizeListInput;
