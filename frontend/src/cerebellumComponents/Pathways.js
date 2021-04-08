import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import CerebellumCircuit from "./Animations/cerebellum_circuit.tsx";
import {Grid, GridColumn, Segment, Dropdown, Card,} from "semantic-ui-react";
import {
    CustomAdobeSegmentCerebellum,
    CustomAnimationDropdown,
    CustomContainerSegment,
    CustomGrid
} from "../styledComponents";

import '../glias.css';


function PathwaysPage(props) {
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
            <CustomContainerSegment>
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid columns={3}>
                                    <CustomGrid width={12}>
                                        <CustomAdobeSegmentCerebellum style={{width: width, height: height}}>
                                            <CerebellumCircuit/>
                                        </CustomAdobeSegmentCerebellum>
                                    </CustomGrid>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card className="category" fluid>
                                            <div onMouseEnter={handleSelector}
                                                 onMouseLeave={handleSelector}>
                                                <Grid textAlign='center' rows={2} className="dropdownContainer"
                                                      verticalAlign='center'>
                                                    <CustomAnimationDropdown placeholder='Select A Lesson' fluid
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

export default PathwaysPage;


