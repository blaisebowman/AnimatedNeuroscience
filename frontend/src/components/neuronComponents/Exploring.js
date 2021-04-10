import React, {useCallback, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import App2 from "./Animations/exploring_one.tsx";

import {Grid, Segment, Dropdown, Card, Icon} from "semantic-ui-react";
import {
    AdobeContainer,
    CustomAnimationDropdown,
    CustomCardDescription,
    CustomContainerSegment,
    CustomContainerSegmentA,
    CustomGrid,
    DDItem, MobileAnimation,
    MobileAnimationDropdown, MobileAnimationSegment,
    MobileContainerSegment,
    MobileGrid, MobileGridPrimaryRow,
    MobileGridSecondaryRow,
    MobileSettingsDropdown
} from "../../styledComponents";

import '../../glias.css';


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
    const [orientationIs, setOrientationIs] = useState(0);
    function handleSelector() {
        if(selectorIsVisible === true){
            setSelectorIsVisible(false);
        }
        else {
            setSelectorIsVisible(true );
        }
        console.log(selectorIsVisible);
    }
    window.addEventListener("orientationchange", function(event) {
        console.log("the orientation of the device is now " + event.target.screen.orientation.angle);
        setOrientationIs(event.target.screen.orientation.angle);

    });
    useEffect(()=>{
            console.log("the orientation of the device is now " + orientationIs);
    }, []);

    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(isMobile === false) {
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
                                                        <CustomAnimationDropdown placeholder='Select A Lesson' fluid
                                                                                 open={selectorIsVisible}>
                                                            <Dropdown.Menu className="menu" fluid>
                                                                <Dropdown.Item>
                                                                    <Link to={{
                                                                        pathname: "/neurons-exploring",
                                                                        state: {selectorIsVisible: false}
                                                                    }} className='navText'>Exploring the Neuron</Link>
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

    else if (orientationIs === 0) {
        return (
            <div className="AppMobile">
                <MobileAnimationSegment>
                    <MobileGrid>
                        <MobileGridPrimaryRow>
                            <Card fluid>
                                <div onMouseEnter={handleSelector}
                                     onMouseLeave={handleSelector}>
                                        <MobileSettingsDropdown fluid placeholder="Select A Lesson" >
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <Link to={{
                                                        pathname: "/neurons-exploring",
                                                        state: {selectorIsVisible: false}
                                                    }} className='navText'>Exploring the Neuron</Link>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </MobileSettingsDropdown>
                                </div>
                            </Card>
                        </MobileGridPrimaryRow>
                        <MobileGridSecondaryRow>
                            <AdobeContainer>
                            <App2/>
                            </AdobeContainer>
                        </MobileGridSecondaryRow>
                    </MobileGrid>
                </MobileAnimationSegment>
            </div>
        );
    }
    else {
        return (
            <AdobeContainer>
                <App2/>
            </AdobeContainer>
        );
    }
}

export default ExploringPage;


