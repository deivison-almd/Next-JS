/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import '../styles/Home.module.css';
import Switch from '@material-ui/core/Switch';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@mui/material/styles';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#000',
  },
  main: {
    fontFamily:
      "-apple-system,'BlinkMacSystemFont','Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
    textAlign: 'left',
    backgroundColor: '#000',
    lineHeight: 1.5,
  },
  darkHeader: {
    backgroundColor: '#000',
  },
  whiteHeader: {
    backgroundColor: '#fff',
  },
  darkText: {
    color: '#fff',
  },
  whiteText: {
    color: '#000',
  },
  emoji: {
    fontSize: '2em',
  },
}));

export default function App() {
  const classes = useStyles();
  const [state, setState] = useState({
    darkMode: false,
    open: false,
    setOpen: false,
  });
  const handleChange = (name: any) => (event: any) => {
    if (event.target.checked) {
      document.body.style.backgroundColor = 'black';
    } else {
      document.body.style.backgroundColor = 'white';
    }
    setState({ ...state, [name]: event.target.checked });
  };
  const checkMode = state.darkMode ? 'dark' : 'white';
  return (
    <>
      <Grid
        container
        alignItems="center"
        className={classNames(classes[`${checkMode}Header`], classes.main)}
      >
        <Grid
          container
          alignItems="flex-start"
          justifyContent="flex-end"
          direction="row"
        >
          <Switch
            checked={state.darkMode}
            onChange={handleChange('darkMode')}
            value="darkMode"
            size="medium"
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Grid>
        <Grid item xs={12} className={classNames(classes[`${checkMode}Text`])}>
          <h1>Hello!</h1>
          <h2>
            I'm Panayiotis — tech enthusiast and fullstack developer working
            with React & Graphql.
          </h2>
          <h3 className={classes.emoji}>
            <span role="img" aria-label="man behind a computer screen">
              👨‍💻
            </span>
            <span role="img" aria-label="rocket">
              🚀
            </span>{' '}
            <span role="img" aria-label="whale">
              ⚛️
            </span>
          </h3>
        </Grid>
      </Grid>
      {state.darkMode && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="success">Switched to dark mode!</Alert>
        </Snackbar>
      )}
    </>
  );
}
