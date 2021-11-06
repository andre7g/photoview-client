import React from 'react';
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import "./Publications.scss";
import PreviewPublication from './PreviewPublication/PreviewPublication';

export default function Publications(props) {
    const { getPublications  } = props;
    console.log(getPublications);
    return (
        <div className="publications">
            <Grid columns={4}>
                { map( getPublications, ( publication, index )=>(
                    <Grid.Column key={ index }>
                        <PreviewPublication publication={ publication } />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}
