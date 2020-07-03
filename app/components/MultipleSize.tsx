/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { Container, Grid, Button, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MultiSizeDropContainer from '../features/multiSizeDropContainer/MultiSizeDropContainer';
import SizeListInput from '../features/sizeListInput/SizeListInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
      height: '100vh',
      paddingLeft: 0,
      paddingRight: 0,
    },
    textField: {
      width: '100%',
    },
    fileListRoot: {
      height: '100%',
    },
    fileList: {
      overflowY: 'scroll',
      height: '100%',
      paddingTop: 0,
    },
  })
);

const boxMargin = 1;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const MultipleSize: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container spacing={0} className={classes.root}>
        <MultiSizeDropContainer>
          {/* {fileList.length > 0 && <FileList data={fileList} />}
          {fileList.length <= 0 && <DropTeaser />} */}
        </MultiSizeDropContainer>

        <Grid item xs={4} sm={4} className="settings-root">
          <Box
            paddingTop={4}
            paddingRight={1}
            paddingLeft={1}
            paddingBottom={1}
          >
            <Box marginBottom={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="small"
                onClick={async () => {}}
              >
                Resize
              </Button>
            </Box>
            <SizeListInput />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MultipleSize;
