import React, { ReactNode } from 'react';
import { remote } from 'electron';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

const TitleBar = () => {
  return (
    <div className="c-titlebar">
      <IconButton
        aria-label="close"
        size="small"
        style={{ marginTop: 5, marginLeft: 5, backgroundColor: '#fff' }}
        onClick={() => {
          remote.getCurrentWindow().close();
        }}
      >
        <CloseIcon className="p-exit-button" />
      </IconButton>
    </div>
  );
};

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return (
    <>
      <TitleBar />
      {children}
    </>
  );
}
