import React, { ReactNode } from 'react';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';
import { TitleBar } from '../features';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  // eslint-disable-next-line prefer-const
  let history = useHistory();

  const handleNavigate = (
    event: Electron.IpcRendererEvent,
    message: string
  ) => {
    history.push(message);
  };

  React.useEffect(() => {
    ipcRenderer.on('navigate', handleNavigate);

    return () => {
      ipcRenderer.removeListener('navigate', handleNavigate);
    };
  }, []);

  return (
    <>
      <TitleBar />
      {children}
    </>
  );
}
