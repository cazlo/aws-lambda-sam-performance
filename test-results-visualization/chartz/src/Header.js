import React from "react";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";

import logo from "./sam-logo.png";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    logo: {
        marginTop: '2em'
    }
}));

export default function Header() {
    const classes = useStyles();
    return (
        <div>
            <Container maxWidth="xs">
                <Grid container spacing={0}>
                    <Grid item>
                        <img src={logo}  alt="logo" className={classes.logo} />
                    </Grid>
                </Grid>
            </Container>

            <Typography variant="h4" component="h1" gutterBottom align="center">
                SAM Serverless API Performance Analysis
            </Typography>
        </div>
    );
}