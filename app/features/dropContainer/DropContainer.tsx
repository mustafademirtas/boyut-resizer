import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { includes } from 'lodash';

import { ipcRenderer } from 'electron';
import { selectResize } from '../../slices/resizeSlice';
import { ISelectedFile } from '../../interfaces/ISelectedFiles';
import { imageFileTypes } from '../../utils/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fileListRoot: {
      height: '100%',
    },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line react/prop-types
const DropContainer: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { quality } = useSelector(selectResize);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    let data: ISelectedFile[] = [];
    const validFiles = [...(files as any)].filter((f: any) =>
      includes(imageFileTypes, f.type)
    );

    data = validFiles.map((x: any) => {
      return { path: x.path, name: x.name };
    });

    ipcRenderer.send('select-file', data);
  };

  return (
    <Grid
      item
      xs={8}
      sm={8}
      className={classes.fileListRoot}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      {children}
    </Grid>
  );
};

export default DropContainer;
