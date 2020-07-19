import React, { ReactNode } from 'react';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundColor: '#303030',
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
      {/* <TitleBar /> */}
      <TitleBar />
      <SubTitleBar />
      {children}
      <AboutModal />
    </ThemeProvider>
  );
}
