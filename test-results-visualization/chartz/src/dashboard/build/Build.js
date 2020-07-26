import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Title from "../Title";

export default function Build() {
    return (
        <div>
            <Title>Build</Title>
            <Container>
                <Grid container>
                    <Grid item>
                        todo
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
