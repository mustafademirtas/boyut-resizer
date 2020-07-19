import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeFileInfo } from './fileListSlice';

import { IImageInfo } from '../../interfaces/IImageInfo';
import formatBytes from '../../utils/formatBytes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fileList: {
      overflowY: 'scroll',
      height: '100%',
      padding: 0,
      backdropFilter: 'blur(20px)',
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

function generate(element: React.ReactElement) {
  return Array.from({ length: 50 }, (v, i) => i).map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
type Props = {
  data: IImageInfo[];
};

// <Avatar>
//  <FolderIcon />
// </Avatar>

export default function FileList({ data }: Props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <List dense={false} className={classes.fileList}>
      {data.map((x, i) => (
        <ListItem divider key={x.id} style={{ marginTop: i === 0 ? 25 : 0 }}>
          {/* <ListItemAvatar>
            <Avatar
              alt={x.name}
              src={`file://${x.path}`}
              className={classes.large}
            />
          </ListItemAvatar> */}
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography color="textPrimary">{x.name}</Typography>}
            secondary={formatBytes(x.size)}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                dispatch(removeFileInfo(x.id));
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      {/* {generate(
        <ListItem divider>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Single-line item" secondary="Secondary text" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )} */}
    </List>
  );
}
