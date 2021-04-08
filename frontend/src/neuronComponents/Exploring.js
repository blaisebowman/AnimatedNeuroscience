import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import App2 from "./Animations/exploring_one.tsx";

import {Grid, GridColumn, Segment, Dropdown, Card,} from "semantic-ui-react";
import {
    CustomAnimationDropdown,
    CustomContainerSegment,
    CustomContainerSegmentA,
    CustomGrid
} from "../styledComponents";

import '../glias.css';


function ExploringPage(props) {
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
            <CustomContainerSegment>
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid columns={2}>
                                    <CustomGrid width={12}>
                                        <Segment className="adobeSeg" style={{width: width, height: height}}>
                                            <App2/>
                                        </Segment>
                                    </CustomGrid>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card className="category" fluid>
                                            <div onMouseEnter={handleSelector}
                                                 onMouseLeave={handleSelector}>
                                                <Grid textAlign='center' rows={3} className="dropdownContainer"
                                                      verticalAlign='center'>
                                                    <CustomAnimationDropdown placeholder='Select A Lesson' fluid open={selectorIsVisible}>
                                                        <Dropdown.Menu className="menu" fluid>
                                                            <Dropdown.Item>
                                                                <Link to={{pathname: "/neurons-exploring", state: {selectorIsVisible: false}}} className='navText'>Exploring the Neuron</Link>
                                                            </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/neurons-protein", state: {selectorIsVisible: false}}} className='navText'>Protein Synthesis</Link>
                                                        </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/neurons-cellular", state: {selectorIsVisible: false}}} className='navText'>Cellular Respiration</Link>
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

export default ExploringPage;


