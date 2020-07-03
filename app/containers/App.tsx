import React, { ReactNode } from 'react';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { show } from '../slices/aboutModalSlice';

import { TitleBar, AboutModal } from '../features';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const dispatch = useDispatch();

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
    <>
      <TitleBar />
      {children}
      <AboutModal />
    </>
  );
}
