import brain from '../images/brain_bw.jpg';
import '../App.css';
import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Image, Grid} from 'semantic-ui-react';


const EntryPage = () => {
    return (
        <div>
            <Grid columns={1} textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column/>
                    <Grid.Column style={{maxWidth: '70vh'}}>
                        <Link to="/introduction">
                            <Image src={brain} size='big'/>
                        </Link>
                    </Grid.Column>
                    <Grid.Column/>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default EntryPage;

