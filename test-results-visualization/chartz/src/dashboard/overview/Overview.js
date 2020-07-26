import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Title from "../Title";
// import AnimatedRadar from "./AnimatedRadar";
import Radar from "./OverviewRadar";

export default function Overview() {
    return (
        <div>
            <Title>Overview</Title>
            <Container>
                <Grid container>
                    <Grid item>
                        <Radar />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
