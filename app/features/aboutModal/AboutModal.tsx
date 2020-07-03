import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';
import { hide, selectAboutModal } from '../../slices/aboutModalSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAboutModalProps {}

const AboutModal: React.FC<IAboutModalProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const visible = useSelector(selectAboutModal);
  const [version, setVersion] = React.useState('initialState');

  const handleClose = () => {
    dispatch(hide());
  };

  const handleVerison = (event: any, arg: any) => {
    setVersion(arg.version);
  };

  React.useEffect(() => {
    ipcRenderer.on('app_version', handleVerison);
    ipcRenderer.send('app_version');
    return () => {
      ipcRenderer.removeListener('app_version', handleVerison);
    };
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={visible}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={visible}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">{`Version ${version}`}</h2>
        </div>
      </Fade>
    </Modal>
  );
};

export default AboutModal;
