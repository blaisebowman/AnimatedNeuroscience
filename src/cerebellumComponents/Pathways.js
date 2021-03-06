import React, {useCallback, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import CerebellumCircuit from "./Animations/cerebellum_circuit.tsx";
import {Grid, GridColumn, Segment, Dropdown, Card,} from "semantic-ui-react";

import '../glias.css';


function PathwaysPage(props) {
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
    const history = useHistory();
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const adobeContainer = useCallback(x => {
        if (x !== null){
            setHeight(x.getBoundingClientRect.height);
            setWidth(x.getBoundingClientRect.width);
        }
    }, []);

    function handleSelector() {
        if (selectorIsVisible === true) {
            setSelectorIsVisible(false);
        } else {
            setSelectorIsVisible(true);
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
                                        <Segment className="adobeSeg" style={{width: width, height: height}}>
                                            <CerebellumCircuit/>
                                        </Segment>
                                    </GridColumn>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card className="category">
                                            <div onMouseEnter={handleSelector}
                                                 onMouseLeave={handleSelector}>
                                                <Grid textAlign='center' rows={2} className="dropdownContainer"
                                                      verticalAlign='center'>
                                                    <Dropdown placeholder='Select A Lesson' fluid
                                                              open={selectorIsVisible}>
                                                        <Dropdown.Menu className="menu" fluid>
                                                            <Dropdown.Item>
                                                                <Link to={{
                                                                    pathname: "/cerebellum-microcircuitry",
                                                                    state: {selectorIsVisible: false}
                                                                }} className='navText'>Microcircuitry</Link>
                                                            </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{
                                                                pathname: "/cerebellum-pathways",
                                                                state: {selectorIsVisible: false}
                                                            }} className='navText'>Pathways</Link>
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

export default PathwaysPage;


