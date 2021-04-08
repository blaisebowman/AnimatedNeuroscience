import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import AutonomicNervousSystem from "./Animations/autonomic_nervous_system";
import {Grid, Segment, Dropdown, Card,} from "semantic-ui-react";
import {CustomAdobeSegmentNervous, CustomContainerSegment, CustomGrid, CustomAnimationDropdown} from "../styledComponents";


import '../glias.css';


function AutonomicNervousSystemPage(props) {
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
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
            <CustomContainerSegment className="body">
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid columns={3}>
                                    <CustomGrid width={12}>
                                        <CustomAdobeSegmentNervous style={{width: width, height: height}}>
                                            <AutonomicNervousSystem/>
                                        </CustomAdobeSegmentNervous>
                                    </CustomGrid>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card className="category" fluid>
                                            <div onMouseEnter={handleSelector}
                                                 onMouseLeave={handleSelector}>
                                                <Grid textAlign='center' rows={3} className="dropdownContainer"
                                                      verticalAlign='middle'>
                                                    <CustomAnimationDropdown placeholder='Select A Lesson' fluid
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
                                                    </CustomAnimationDropdown>
                                                </Grid>
                                            </div>
                                        </Card>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
            </CustomContainerSegment>
        </div>
    );
}

export default AutonomicNervousSystemPage;


