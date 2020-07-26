import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Title from "../Title";
import ColdStarts from "./coldStarts/ColdStarts";


export default function Latency() {
    return (
        <div>
            <Title>Latency</Title>
            <Container>
                <Grid container>
                    <Grid item>
                        todo
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <ColdStarts/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

