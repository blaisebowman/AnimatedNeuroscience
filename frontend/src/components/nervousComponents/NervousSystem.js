import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import PageHeader from "../PageHeader";
import NavigationBar from "../NavigationBar";
import {Grid, Image, Segment, Button,  Card, Icon, Divider, List} from "semantic-ui-react"
import nervoussystem from "../../images/nervoussystem.jpg";

import '../../neurons.css';

import '../../glias.css';


function NervousSystem(props) {
    const [redirecting, setRedirecting] = useState(0);
    return (
        <div className="App">
            <Segment className="body">
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid columns={3}>
                                    <Grid.Column width={6} className={'firstCol'}>
                                        <Card fluid>
                                            <Image src={nervoussystem}/>
                                            <Card.Content>
                                                <Card.Description>
                                                    Pictured: The Nervous System
                                                </Card.Description>
                                                <Card.Content>
                                                    Placeholder
                                                </Card.Content>
                                            </Card.Content>
                                        </Card>
                                        <Card fluid>
                                            <Card.Content>
                                                <Card.Description>
                                                    The Nervous System Overview
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content textAlign='left'>
                                                <Icon name='balance scale'/> WIP
                                                <Divider/>
                                                <Icon name='exchange'/> WIP
                                                <Divider/>
                                                <Icon name='comment alternate outline'/>WIP
                                                <Divider/>
                                            </Card.Content>
                                        </Card>

                                    </Grid.Column>
                                    <Grid.Column width={6} className="definitionSegment">
                                        <Card fluid>
                                            <Card.Content>The Nervous System</Card.Content>
                                            <Card.Content textAlign='left'>
                                                WIP
                                            </Card.Content>
                                            <Card.Content textAlign='left'>
                                                WIP
                                            </Card.Content>
                                            <Card.Content textAlign='left'>
                                                WIP
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card fluid>
                                            <Card.Description>
                                                Learn More
                                            </Card.Description>
                                        </Card>
                                        <Card fluid>
                                            <Card.Description>The Nervous System Lessons</Card.Description>
                                            <Card.Content>
                                                <div style={{overflowX: 'hidden'}}>
                                                    <Link to={{pathname: "/nervoussystem-autonomic"}} className='navText'>
                                                        <Button color='blue'>ANS</Button>
                                                    </Link>
                                                </div>
                                                <Icon name="clock outline"/>3 min.
                                            </Card.Content>
                                            <Card.Content>
                                                <div style={{overflowX: 'hidden'}}>
                                                    <Link to={{pathname: "/nervoussystem-actionpotentials"}} className='navText'>
                                                        <Button color='blue'>Action Potentials</Button>
                                                    </Link>
                                                </div>
                                                <Icon name="clock outline"/>7 min.
                                            </Card.Content><Card.Content>
                                                <div style={{overflowX: 'hidden'}}>
                                                    <Link to={{pathname: "/nervoussystem-hypothalamus"}} className='navText'>
                                                        <Button color='blue'>Hypothalamus</Button>
                                                    </Link>
                                                </div>
                                                <Icon name="clock outline"/>5 min.
                                            </Card.Content>

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

export default NervousSystem;