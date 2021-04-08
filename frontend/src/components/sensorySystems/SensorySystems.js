import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import PageHeader from "../PageHeader";
import NavigationBar from "../NavigationBar";
import {Grid, Image, Segment, Button,  Card, Icon, Divider, List} from "semantic-ui-react"
import visual from "../../images/visual.jpg";

import '../../neurons.css';

import '../../glias.css';


function SensorySystems(props) {
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
                                            <Image src={visual}/>
                                            <Card.Content>
                                                <Card.Description>
                                                    Pictured: The Visual System
                                                </Card.Description>
                                                <Card.Content>
                                                    Placeholder
                                                </Card.Content>
                                            </Card.Content>
                                        </Card>
                                        <Card fluid>
                                            <Card.Content>
                                                <Card.Description>
                                                    Sensory Systems Overview
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
                                            <Card.Content>Sensory Systems</Card.Content>
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
                                            <Card.Description>The Brain Lessons</Card.Description>
                                            <Card.Content>
                                                <div style={{overflowX: 'hidden'}}>
                                                    <Link to={{pathname: "/sensorysystems-visual"}} className='navText'>
                                                        <Button color='blue'>The Visual System</Button>
                                                    </Link>
                                                </div>
                                                <Icon name="clock outline"/>10 min.
                                            </Card.Content>
                                            <Card.Content>
                                                <div style={{overflowX: 'hidden'}}>
                                                    <Link to={{pathname: "/sensorysystems-auditory"}} className='navText'>
                                                        <Button color='blue'>The Auditory System</Button>
                                                    </Link>
                                                </div>
                                                <Icon name="clock outline"/>5 min.
                                            </Card.Content>
                                            <Card.Content>
                                                <div style={{overflowX: 'hidden'}}>
                                                    <Link to={{pathname: "/sensorysystems-olfactory"}} className='navText'>
                                                        <Button color='blue'>The Olfactory System</Button>
                                                    </Link>
                                                </div>
                                                <Icon name="clock outline"/>7 min.
                                            </Card.Content>
                                            <Card.Content>
                                                <div style={{overflowX: 'hidden'}}>
                                                    <Link to={{pathname: "/sensorysystems-pain"}} className='navText'>
                                                        <Button color='blue'>Pain Perception</Button>
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

export default SensorySystems;