import React, { ReactNode } from 'react';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { selectAppSettings } from '../slices/appSettingsSlice';
import { show } from '../slices/aboutModalSlice';
import { TitleBar, AboutModal, SubTitleBar } from '../features';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const dispatch = useDispatch();
  const appSettings = useSelector(selectAppSettings);

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundColor: '#303030',
            backgroundImage: `url(./backgrounds/${appSettings.bgImage})`,
          },
        },
      },
    },
  });

  const handleNavigate = (
    event: Electron.IpcRendererEvent,
    message: string
  ) => {
    history.push(message);
  };

  const handleAboutModal = () => {
    dispatch(show());
  };

  React.useEffect(() => {
    ipcRenderer.on('navigate', handleNavigate);
    ipcRenderer.on('show-about', handleAboutModal);
    return () => {
      ipcRenderer.removeListener('navigate', handleNavigate);
      ipcRenderer.removeListener('show-about', handleAboutModal);
    };
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TitleBar />
      <SubTitleBar />
      {children}
      <AboutModal />
    </ThemeProvider>
  );
}
