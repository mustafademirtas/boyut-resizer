/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { v4 } from 'uuid';

import { Grid, TextField, Box, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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

interface Size {
  width: string;
  height: string;
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SizeListInput: React.FC<Props> = () => {
  const classes = useStyles();
  const [size, setSize] = React.useState(1);
  const [dimensions, setDimensions] = React.useState<Size[]>([
    { width: '', height: '', id: v4() },
  ]);
  const handleWidthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const i = dimensions.findIndex((x) => x.id === id);
    const dims = Array.from(dimensions);
    dims[i].width = e.target.value;
    setDimensions(dims);
  };

  const handleHeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const i = dimensions.findIndex((x) => x.id === id);
    const dims = Array.from(dimensions);
    dims[i].height = e.target.value;
    setDimensions(dims);
  };

  const removeDimension = (id: string) => {
    if (dimensions.length === 1) return;
    const fDims = dimensions.filter((x) => x.id !== id);
    setDimensions(fDims);
  };

  return (
    <Box component="div">
      {dimensions.map((v, i) => (
        <Box display="flex" key={`dimension-${v.id}`} alignItems="center">
          <Box paddingRight={1}>
            <TextField
              label="Width"
              className={classes.textField}
              value={v.width}
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
            />
          </Box>
          <Box paddingRight={1}>
            <TextField
              label="Height"
              className={classes.textField}
              value={v.height}
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
            />
          </Box>
          <Box flexShrink={1}>
            <IconButton
              aria-label="delete"
              disabled={dimensions.length === 1}
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
          aria-label="delete"
          onClick={() => {
            setDimensions([...dimensions, { width: '', height: '', id: v4() }]);
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SizeListInput;
