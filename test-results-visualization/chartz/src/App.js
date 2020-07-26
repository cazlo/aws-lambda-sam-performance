import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Header from "./Header";
import Dashboard from "./dashboard/Dashboard";
import "./App.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://andrewpaettie.com/">
        Andrew Paettie
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function App() {
  return (
    <Container>
      <Box my={4}>
        <Header/>
        <Dashboard/>
        <Copyright />
      </Box>
    </Container>
  );
}
