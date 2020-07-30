import React from 'react';
import Grid from "@material-ui/core/Grid";

import Title from "../Title";
// import AnimatedRadar from "./AnimatedRadar";
import Radar from "./OverviewRadar";
import Box from "@material-ui/core/Box";

export default function Overview() {
    return (
        <Box>
            <Title>Overview</Title>
            <Grid container direction="column">
                <Grid item><Radar /></Grid>
                <Grid item></Grid>
            </Grid>
        </Box>
    );
}
