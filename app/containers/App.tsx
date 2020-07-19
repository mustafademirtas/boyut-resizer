import React, { ReactNode } from 'react';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { selectAppSettings } from '../slices/appSettingsSlice';
import { show } from '../slices/aboutModalSlice';
import { TitleBar, AboutModal, SubTitleBar } from '../features';

import bg01 from '../backgrounds/bg.jpg';
import bg02 from '../backgrounds/bg02.jpg';
import bg03 from '../backgrounds/bg03.jpg';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const dispatch = useDispatch();
  const appSettings = useSelector(selectAppSettings);

  const imageSelect = () => {
    if (appSettings.bgImage === 'bg.jpg') return bg01;
    if (appSettings.bgImage === 'bg02.jpg') return bg02;
    if (appSettings.bgImage === 'bg03.jpg') return bg03;
    return bg01;
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundColor: '#303030',
            backgroundImage: `url(${imageSelect()})`,
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
