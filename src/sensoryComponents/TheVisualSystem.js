import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";

import {Grid, GridColumn, Segment, Dropdown, Card,} from "semantic-ui-react";

import '../glias.css';


function TheVisualSystemPage(props) {
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
    const history = useHistory();

    function handleSelector() {
        if(selectorIsVisible === true){
            setSelectorIsVisible(false);
        }
        else {
            setSelectorIsVisible(true );
        }
        console.log(selectorIsVisible);
    }

    return (
        <div className="App">
            <Segment className="body">
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid columns={3}>
                                    <GridColumn width={12}>
                                        <Segment className="adobeSeg">
                                            VISUAL PLACEHOLDER
                                        </Segment>
                                    </GridColumn>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card className="category">
                                            <div onMouseEnter={handleSelector}
                                                 onMouseLeave={handleSelector}>
                                                <Grid textAlign='center' rows={4} className="dropdownContainer"
                                                      verticalAlign='center'>
                                                    <Dropdown placeholder='Select A Lesson' fluid open={selectorIsVisible}>
                                                        <Dropdown.Menu className="menu" fluid>
                                                            <Dropdown.Item>
                                                                <Link to={{pathname: "/sensorysystems-visual", state: {selectorIsVisible: false}}} className='navText'>Visual System</Link>
                                                            </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/sensorysystems-auditory", state: {selectorIsVisible: false}}} className='navText'>Auditory System</Link>
                                                        </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/sensorysystems-olfactory", state: {selectorIsVisible: false}}} className='navText'>Olfactory System</Link>
                                                        </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/sensorysystems-pain", state: {selectorIsVisible: false}}} className='navText'>Pain Perception</Link>
                                                        </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Grid>
                                            </div>
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

export default TheVisualSystemPage;


