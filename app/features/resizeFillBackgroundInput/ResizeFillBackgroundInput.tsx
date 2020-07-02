import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormControlLabel,
  Checkbox,
  Box,
  ClickAwayListener,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BlockPicker } from 'react-color';

import {
  selectResize,
  setBackgroundFillColor,
  setAllowFillColor,
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

const ResizeFillBackgroundInput: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { backgroundFillColor, allowFillColor } = useSelector(selectResize);
  const [showPicker, setShowPicker] = React.useState(false);

  const handleChange = (color: any, event: any) => {
    if (color) {
      dispatch(setBackgroundFillColor(color.hex));
    }
  };

  const handleAllowFillColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setAllowFillColor(event.target.checked));
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <FormControlLabel
          control={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Checkbox
              checked={allowFillColor}
              onChange={handleAllowFillColorChange}
              color="primary"
              size="small"
            />
          }
          label="Allow Fill"
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
            color={backgroundFillColor}
            onChangeComplete={handleChange}
          />
        </ClickAwayListener>
      )}
    </>
  );
};

export default ResizeFillBackgroundInput;
