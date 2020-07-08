import React, { ReactNode } from 'react';
import { remote } from 'electron';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Remove';
import { IconButton, Typography } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import FramelessTitleBar from 'frameless-titlebar';

import icon from '../../../resources/icon.png';

const currentWindow = remote.getCurrentWindow();

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TitleBar: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <div>
      <FramelessTitleBar
        // iconSrc={icon} // app icon
        currentWindow={currentWindow} // electron window instance
        platform={process.platform as 'darwin' | 'linux' | 'win32' | undefined} // win32, darwin, linux
        menu={[{}]}
        theme={{
          bar: {
            background: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          // any theme overrides specific
          // to your application :)
        }}
        // title="Boyut"
        onClose={() => currentWindow.close()}
        onMinimize={() => currentWindow.minimize()}
        onMaximize={() => currentWindow.maximize()}
        // when the titlebar is double clicked
        onDoubleClick={() => currentWindow.maximize()}
      >
        {/* <Typography>Hello</Typography> */}
      </FramelessTitleBar>
    </div>
    // <div className="c-titlebar">
    //   <IconButton
    //     aria-label="close"
    //     size="small"
    //     style={{ marginTop: 5, marginLeft: 5, backgroundColor: '#fff' }}
    //     onClick={() => {
    //       remote.getCurrentWindow().close();
    //     }}
    //   >
    //     <CloseIcon className="p-exit-button" color="secondary" />
    //   </IconButton>
    //   <IconButton
    //     aria-label="close"
    //     size="small"
    //     style={{ marginTop: 5, marginLeft: 5, backgroundColor: '#fff' }}
    //     onClick={() => {
    //       remote.getCurrentWindow().minimize();
    //     }}
    //   >
    //     <MinimizeIcon className="p-exit-button" color="secondary" />
    //   </IconButton>
    // </div>
  );
};

export default TitleBar;
