import React, { ReactNode } from 'react';
import { remote } from 'electron';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TitleBar: React.FC<Props> = () => {
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
      <IconButton
        aria-label="close"
        size="small"
        style={{ marginTop: 5, marginLeft: 5, backgroundColor: '#fff' }}
        onClick={() => {
          remote.getCurrentWindow().minimize();
        }}
      >
        <MinimizeIcon className="p-exit-button" />
      </IconButton>
    </div>
  );
};

export default TitleBar;
