import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Memory from "./memory/Memory";
import Latency from "./latency/Latency";
import Build from "./build/Build";
import Overview from "./overview/Overview";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper} variant="outlined">
                <Overview/>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper} variant="outlined">
                <Latency/>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper} variant="outlined">
                <Memory/>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper} variant="outlined">
                <Build/>
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </main>
    </div>
  );
}
