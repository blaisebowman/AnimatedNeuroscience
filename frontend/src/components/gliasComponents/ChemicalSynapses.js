import React, {useState, useCallback, useEffect} from 'react';
import {Link} from "react-router-dom";
import ChemicalSynapse from "./Animations/chemicalSynapse";
import {Grid, Image, Segment, Button, Dropdown, Card, Icon, Divider, Message} from "semantic-ui-react";

import '../../glias.css';
import {
    AdobeContainer,
    CustomAnimationDropdown,
    CustomContainerSegment,
    CustomGrid,
    MobileAnimationSegment, MobileGrid, MobileGridSecondaryRow, MobileSettingsDropdown, PortraitMessage
} from "../../styledComponents";
import Oligodendroglia from "./Animations/oligodendroglia";


function ChemicalSynpasesPage(props) {
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
        sessionStorage.setItem('orientation', event.target.screen.orientation.angle);
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
                                    <Grid columns={3}>
                                        <CustomGrid width={12}>
                                            <Segment className="adobeSeg" style={{width: width, height: height}}>
                                                <ChemicalSynapse/>
                                            </Segment>
                                        </CustomGrid>
                                        <Grid.Column width={4} className="gridParent">
                                            <Card className="category" fluid>
                                                <div onMouseEnter={handleSelector}
                                                     onMouseLeave={handleSelector}>
                                                    <Grid textAlign='center' rows={4} className="dropdownContainer"
                                                          verticalAlign='center'>
                                                        <CustomAnimationDropdown placeholder='Select A Lesson' fluid
                                                                                 open={selectorIsVisible}>
                                                            <Dropdown.Menu className="menu" fluid>
                                                                <Dropdown.Item>
                                                                    <Link to={{
                                                                        pathname: "/gliasandsynapses-astrocyte",
                                                                        state: {selectorIsVisible: false}
                                                                    }} className='navText'>Astrocyte</Link>
                                                                </Dropdown.Item><Dropdown.Item>
                                                                <Link to={{
                                                                    pathname: "/gliasandsynapses-oligodendroglia",
                                                                    state: {selectorIsVisible: false}
                                                                }} className='navText'>Oligodendroglia</Link>
                                                            </Dropdown.Item><Dropdown.Item>
                                                                <Link to={{
                                                                    pathname: "/gliasandsynapses-chemical",
                                                                    state: {selectorIsVisible: false}
                                                                }} className='navText'>Chemical Synpases</Link>
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
                                                        pathname: "/gliasandsynapses-astrocyte",
                                                        state: {selectorIsVisible: false}
                                                    }} className='navText'>Astrocyte</Link>
                                                </Dropdown.Item><Dropdown.Item>
                                                <Link to={{
                                                    pathname: "/gliasandsynapses-oligodendroglia",
                                                    state: {selectorIsVisible: false}
                                                }} className='navText'>Oligodendroglia</Link>
                                            </Dropdown.Item><Dropdown.Item>
                                                <Link to={{
                                                    pathname: "/gliasandsynapses-chemical",
                                                    state: {selectorIsVisible: false}
                                                }} className='navText'>Chemical Synpases</Link>
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
                                <ChemicalSynapse/>
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
                <ChemicalSynapse/>
            </AdobeContainer>
        );
    }
}

export default ChemicalSynpasesPage;


