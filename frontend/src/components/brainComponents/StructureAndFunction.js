import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import BrainStructure from "./Animations/brain_structure";
import {Grid, Segment, Dropdown, Card, Message,} from "semantic-ui-react";
import {
    AdobeContainer,
    CustomAdobeSegmentBrain,
    CustomContainerSegment,
    CustomGrid,
    MobileAnimationSegment, MobileGrid, MobileGridSecondaryRow, MobileSettingsDropdown, PortraitMessage
} from "../../styledComponents";
import {CustomAnimationDropdown} from "../../styledComponents";

import '../../glias.css';


function StructureAndFunctionPage(props) {
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
    const [orientationIs, setOrientationIs] = useState(parseInt(sessionStorage.getItem('orientation')) || 0);

    function handleSelector() {
        if (selectorIsVisible === true) {
            setSelectorIsVisible(false);
        } else {
            setSelectorIsVisible(true);
        }
        console.log(selectorIsVisible);
    }
    function handleSelector() {
        if (selectorIsVisible === true) {
            setSelectorIsVisible(false);
        } else {
            setSelectorIsVisible(true);
        }
        console.log(selectorIsVisible);
    }
    function handleOrientationChange(event) {
        setOrientationIs(event.target.screen.orientation.angle);
        sessionStorage.setItem('orientation', event.target.screen.orientation.angle);
        console.log(parseInt(sessionStorage.getItem('orientation')));
    }

    useEffect(() => {
        window.addEventListener('orientationchange', handleOrientationChange);
        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        }
    }, []);


    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile === false) {
        return (
            <div className="App">
                <CustomContainerSegment>
                    <div className="modGrid">
                        <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                            <Grid.Column width={16} className='noPadding'>
                                <Segment className="imgSeg">
                                    <Grid columns={3}>
                                        <CustomGrid width={12}>
                                            <CustomAdobeSegmentBrain>
                                                <BrainStructure/>
                                            </CustomAdobeSegmentBrain>
                                        </CustomGrid>
                                        <Grid.Column width={4} className="gridParent">
                                            <Card className="category" fluid>
                                                <div onMouseEnter={handleSelector}
                                                     onMouseLeave={handleSelector}>
                                                    <Grid textAlign='center' rows={4} className="dropdownContainer"
                                                          verticalAlign='middle'>
                                                        <CustomAnimationDropdown placeholder='Select A Lesson' fluid
                                                                                 open={selectorIsVisible}>
                                                            <Dropdown.Menu className="menu">
                                                                <Dropdown.Item>
                                                                    <Link to={{
                                                                        pathname: "/thebrain-neuraltube",
                                                                        state: {selectorIsVisible: false}
                                                                    }} className='navText'>Neural Tube</Link>
                                                                </Dropdown.Item><Dropdown.Item>
                                                                <Link to={{
                                                                    pathname: "/thebrain-earlydevelopment",
                                                                    state: {selectorIsVisible: false}
                                                                }} className='navText'>Early Development</Link>
                                                            </Dropdown.Item><Dropdown.Item>
                                                                <Link to={{
                                                                    pathname: "/thebrain-lobes",
                                                                    state: {selectorIsVisible: false}
                                                                }} className='navText'>Lobes</Link>
                                                            </Dropdown.Item><Dropdown.Item>
                                                                <Link to={{
                                                                    pathname: "/thebrain-structure",
                                                                    state: {selectorIsVisible: false}
                                                                }} className='navText'>Structure and Function</Link>
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
                        <MobileGridSecondaryRow>
                            <AdobeContainer>
                                <Card fluid>
                                    <div onMouseEnter={handleSelector}
                                         onMouseLeave={handleSelector}>
                                        <MobileSettingsDropdown fluid placeholder="Select A Lesson" >
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <Link to={{
                                                        pathname: "/thebrain-neuraltube",
                                                        state: {selectorIsVisible: false}
                                                    }} className='navText'>Neural Tube</Link>
                                                </Dropdown.Item><Dropdown.Item>
                                                <Link to={{
                                                    pathname: "/thebrain-earlydevelopment",
                                                    state: {selectorIsVisible: false}
                                                }} className='navText'>Early Development</Link>
                                            </Dropdown.Item><Dropdown.Item>
                                                <Link to={{
                                                    pathname: "/thebrain-lobes",
                                                    state: {selectorIsVisible: false}
                                                }} className='navText'>Lobes</Link>
                                            </Dropdown.Item><Dropdown.Item>
                                                <Link to={{
                                                    pathname: "/thebrain-structure",
                                                    state: {selectorIsVisible: false}
                                                }} className='navText'>Structure and Function</Link>
                                            </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </MobileSettingsDropdown>
                                    </div>
                                </Card>
                                <Card fluid>
                                    <PortraitMessage warning>
                                        <Message.Header>Tip of the Day</Message.Header>
                                        <b>For a better experience, please rotate your device into landscape orientation.</b>
                                    </PortraitMessage>
                                </Card>
                                <BrainStructure/>
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
                <BrainStructure/>
            </AdobeContainer>
        );
    }
}

export default StructureAndFunctionPage;


