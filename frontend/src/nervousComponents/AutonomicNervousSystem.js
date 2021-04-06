import React, {useCallback, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import AutonomicNervousSystem from "./Animations/autonomic_nervous_system";
import {Grid, GridColumn, Segment, Dropdown, Card,} from "semantic-ui-react";
import {CustomAdobeSegmentNervous} from "../styledComponents";

import '../glias.css';


function AutonomicNervousSystemPage(props) {
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
                                        <CustomAdobeSegmentNervous style={{width: width, height: height}}>
                                            <AutonomicNervousSystem/>
                                        </CustomAdobeSegmentNervous>
                                    </GridColumn>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card className="category">
                                            <div onMouseEnter={handleSelector}
                                                 onMouseLeave={handleSelector}>
                                                <Grid textAlign='center' rows={3} className="dropdownContainer"
                                                      verticalAlign='middle'>
                                                    <Dropdown placeholder='Select A Lesson' fluid
                                                              open={selectorIsVisible}>
                                                        <Dropdown.Menu className="menu">
                                                            <Dropdown.Item>
                                                                <Link to={{
                                                                    pathname: "/nervoussystem-autonomic",
                                                                    state: {selectorIsVisible: false}
                                                                }} className='navText'>ANS</Link>
                                                            </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{
                                                                pathname: "/nervoussystem-actionpotentials",
                                                                state: {selectorIsVisible: false}
                                                            }} className='navText'>Action Potentials</Link>
                                                        </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{
                                                                pathname: "/nervoussystem-hypothalamus",
                                                                state: {selectorIsVisible: false}
                                                            }} className='navText'>Hypothalamus</Link>
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

export default AutonomicNervousSystemPage;


