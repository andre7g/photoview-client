import React from 'react'
import { Grid } from "semantic-ui-react";
import Feed from '../../components/Home/Feed/Feed';
import "./Home.scss";

export default function Home() {
    return (
        <Grid className="home">
            <Grid.Column className="home__right" width={3}>
                {/* <h2>Usuarios no seguidos</h2> */}
            </Grid.Column>
            <Grid.Column className="home__left" width={10}>
                <Feed/>
            </Grid.Column>
        </Grid>
    )
}
