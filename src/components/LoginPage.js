import React from "react";
import {Button, Card, Divider, Grid, Header, Icon, Image, Segment} from "semantic-ui-react"
import NavigationBar from "./NavigationBar";
import PageHeader from "./PageHeader";
import synapses from "../images/synapses.jpg";
import {Link} from "react-router-dom";

function LoginPage(props) {
    return (
        <div className="App">
            <Segment className="header">
                <PageHeader/>
            </Segment>
            <NavigationBar/>
            <Segment className="body">
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid columns={3}>
                                    <Grid.Column width={6} className={'firstCol'}>
                                        <Card fluid>
                                            Under Construction
                                        </Card>

                                    </Grid.Column>

                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
            </Segment>
        </div>

    );
}

export default LoginPage;