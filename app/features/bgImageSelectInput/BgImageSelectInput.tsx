import * as React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { selectAppSettings, setBgImage } from '../../slices/appSettingsSlice';
import bg01 from '../../backgrounds/bg.jpg';
import bg02 from '../../backgrounds/bg02.jpg';
import bg03 from '../../backgrounds/bg03.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectItem: { width: '200px', cursor: 'pointer' },
    selectItemWrapper: { border: '5px solid transparent' },
    selectItemSelected: { border: '5px solid #fff' },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBgImageSelectInputProps {}

const BgImageSelectInput: React.FC<IBgImageSelectInputProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const appSettings = useSelector(selectAppSettings);

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      mt={2}
      mb={2}
    >
      <Box
        onClick={() => {
          dispatch(setBgImage('bg.jpg'));
        }}
      >
        <img
          src={bg01}
          alt="BG01"
          className={`${classes.selectItem} ${
            appSettings.bgImage === 'bg.jpg'
              ? classes.selectItemSelected
              : classes.selectItemWrapper
          }`}
        />
      </Box>
      <Box
        onClick={() => {
          dispatch(setBgImage('bg02.jpg'));
        }}
      >
        <img
          src={bg02}
          alt="BG02"
          className={`${classes.selectItem} ${
            appSettings.bgImage === 'bg02.jpg'
              ? classes.selectItemSelected
              : classes.selectItemWrapper
          }`}
        />
      </Box>
      <Box
        onClick={() => {
          dispatch(setBgImage('bg03.jpg'));
        }}
      >
        <img
          src={bg03}
          alt="BG03"
          className={`${classes.selectItem} ${
            appSettings.bgImage === 'bg03.jpg'
              ? classes.selectItemSelected
              : classes.selectItemWrapper
          }`}
        />
      </Box>
    </Box>
  );
};

export default BgImageSelectInput;
