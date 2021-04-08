import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import {Grid, Segment, Dropdown, Card,} from "semantic-ui-react";
import {
    CustomAdobeSegmentSensory,
    CustomAnimationDropdown,
    CustomContainerSegment,
    CustomGrid
} from "../../styledComponents";
import PainPerception from "./Animations/pain_perception";

import '../../glias.css';


function PainPerceptionPage(props) {
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
                                <Grid columns={3}>
                                    <CustomGrid width={12}>
                                        <CustomAdobeSegmentSensory style={{width: width, height: height}}>
                                            <PainPerception/>
                                        </CustomAdobeSegmentSensory>
                                    </CustomGrid>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card className="category" fluid>
                                            <div onMouseEnter={handleSelector}
                                                 onMouseLeave={handleSelector}>
                                                <Grid textAlign='center' rows={4} className="dropdownContainer"
                                                      verticalAlign='middle'>
                                                    <CustomAnimationDropdown placeholder='Select A Lesson' fluid open={selectorIsVisible}>
                                                        <Dropdown.Menu className="menu" >
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

export default PainPerceptionPage;


