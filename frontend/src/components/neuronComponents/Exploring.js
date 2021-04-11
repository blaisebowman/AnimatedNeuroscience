import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import App2 from "./Animations/exploring_one.tsx";

import {Grid, Segment, Dropdown, Card, Message} from "semantic-ui-react";
import {AdobeContainer, CustomAnimationDropdown, CustomContainerSegment, CustomGrid, MobileAnimationSegment, MobileGrid, MobileGridSecondaryRow, MobileSettingsDropdown, PortraitMessage} from "../../styledComponents";

import '../../glias.css';


function ExploringPage(props) {
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
    async function toggleFullscreen (){
        var status = (document.fullscreenElement && true) || (document.webkitFullscreenElement && true) || (document.mozFullScreenElement && true) || (document.msFullscreenElement && true);
        var elem = document.documentElement;
        if(!status){
            switch(elem){
                case elem.requestFullscreen:
                    elem.requestFullscreen();
                    break;
                case elem.mozRequestFullscreen:
                    elem.mozRequestFullscreen();
                    break;
               case elem.webkitRequestFullscreen:
                    elem.webkitRequestFullscreen();
                    break;
               case elem.msRequestFullscreen:
                    elem.msRequestFullscreen();
                    break;
                default:
                    break;
            }
        } else {
            switch(elem){
                case elem.exitFullscreen:
                    elem.exitFullscreen();
                    break;
                case elem.mozCancelFullscreen:
                    elem.mozCancelFullscreen();
                    break;
                case elem.webkitExitFullscreen:
                    elem.webkitExitFullscreen();
                    break;
                case elem.msExitFullscreen:
                    elem.msExitFullscreen();
                    break;
                default:
                    break;
            }

        }
    }
    async function handleOrientationChange(event) {
        if(event.target.screen.orientation.angle === 90 || event.target.screen.orientation.angle === 270){
           await toggleFullscreen();
        }
        else if (event.target.screen.orientation.angle === 0){
            //document.documentElement.requestFullscreen({ navigationUI: 'show' });
           await toggleFullscreen();
        }
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
                                            <Segment className="adobeSeg">
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
                        <MobileGridSecondaryRow>
                            <AdobeContainer>
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
                                <Card fluid>
                                    <PortraitMessage warning>
                                        <Message.Header>Tip of the Day</Message.Header>
                                        <p>For a better experience, please rotate your device into landscape orientation.</p>
                                    </PortraitMessage>
                                </Card>
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


