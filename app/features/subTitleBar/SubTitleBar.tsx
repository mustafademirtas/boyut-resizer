import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import routes from '../../constants/routes.json';
import icon from '../../../resources/icon.png';
import singleImage from './single_image.png';
import multipleImage from './multiple_image.png';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SubTitleBar: React.FC<Props> = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <Box display="flex" justifyContent="space-between" bgcolor="transparent">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton disableRipple disableFocusRipple>
          <img src={icon} alt="" style={{ width: 32, height: 32 }} />
        </IconButton>
        <Typography color="textPrimary" variant="h5">
          Boyut
        </Typography>
      </Box>

      <Box>
        <IconButton
          disableRipple
          disableFocusRipple
          disabled={routes.HOME === location.pathname}
          style={{
            filter:
              routes.HOME === location.pathname
                ? 'brightness(100%)'
                : 'brightness(75%)',
          }}
          onClick={() => history.push(routes.HOME)}
        >
          <img src={multipleImage} alt="" style={{ width: 32, height: 32 }} />
        </IconButton>
        <IconButton
          disableRipple
          disableFocusRipple
          disabled={routes.MULTIPLESIZE === location.pathname}
          style={{
            filter:
              routes.MULTIPLESIZE === location.pathname
                ? 'brightness(100%)'
                : 'brightness(75%)',
          }}
          onClick={() => history.push(routes.MULTIPLESIZE)}
        >
          <img src={singleImage} alt="" style={{ width: 32, height: 32 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
export default SubTitleBar;
