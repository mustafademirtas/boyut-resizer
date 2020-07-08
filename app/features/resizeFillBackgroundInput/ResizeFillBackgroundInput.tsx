/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormControlLabel,
  Checkbox,
  Box,
  ClickAwayListener,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BlockPicker } from 'react-color';

import {
  selectResize,
  setBackgroundFillColor,
  setAllowFillColor,
} from '../../slices/resizeSlice';

import * as multipleResizeSlice from '../../slices/multipleResizeSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '100%',
    },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  mode?: 'single' | 'multiple';
}

// eslint-disable-next-line react/prop-types
const ResizeFillBackgroundInput: React.FC<Props> = ({ mode }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { backgroundFillColor, allowFillColor } = useSelector(selectResize);
  const multipleSlice = useSelector(
    multipleResizeSlice.selectMultipleResizeSlice
  );

  if (mode === 'single') {
    backgroundFillColor = multipleSlice.backgroundFillColor;
    allowFillColor = multipleSlice.allowFillColor;
  }

  const [showPicker, setShowPicker] = React.useState(false);

  const handleChange = (color: any, event: any) => {
    if (color) {
      if (mode === 'single') {
        dispatch(multipleResizeSlice.setBackgroundFillColor(color.hex));
      } else {
        dispatch(setBackgroundFillColor(color.hex));
      }

      setShowPicker(false);
    }
  };

  const handleAllowFillColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (mode === 'single') {
      dispatch(multipleResizeSlice.setAllowFillColor(event.target.checked));
    } else {
      dispatch(setAllowFillColor(event.target.checked));
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <FormControlLabel
          control={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Checkbox
              checked={
                mode === 'multiple'
                  ? allowFillColor
                  : multipleSlice.allowFillColor
              }
              onChange={handleAllowFillColorChange}
              color="secondary"
              size="small"
            />
          }
          label={<Typography color="textSecondary">Allow Fill</Typography>}
        />
        <Box
          style={{
            backgroundColor: backgroundFillColor,
            width: 50,
            height: 25,
            border: '1px solid rgba(0,0,0,0.1)',
          }}
          onClick={() => {
            setShowPicker(true);
          }}
        />
      </Box>

      {showPicker && (
        <ClickAwayListener
          onClickAway={() => {
            setShowPicker(false);
          }}
        >
          <BlockPicker
            color={
              mode === 'multiple'
                ? backgroundFillColor
                : multipleSlice.backgroundFillColor
            }
            onChangeComplete={handleChange}
          />
        </ClickAwayListener>
      )}
    </>
  );
};
ResizeFillBackgroundInput.defaultProps = { mode: 'multiple' };
export default ResizeFillBackgroundInput;
