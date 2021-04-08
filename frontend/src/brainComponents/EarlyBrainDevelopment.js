import React, {useCallback, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import EarlyBrain from "./Animations/early_development";

import {Grid, GridColumn, Segment, Dropdown, Card,} from "semantic-ui-react";
import {CustomAnimationDropdown, CustomContainerSegment, CustomGrid} from "../styledComponents";


import '../glias.css';


function EarlyBrainDevelopmentPage(props) {
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
                                        <Segment className="adobeSeg">
                                           <EarlyBrain/>
                                        </Segment>
                                    </CustomGrid>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card className="category" fluid>
                                            <div onMouseEnter={handleSelector}
                                                 onMouseLeave={handleSelector}>
                                                <Grid textAlign='center' rows={4} className="dropdownContainer"
                                                      verticalAlign='middle'>
                                                    <CustomAnimationDropdown placeholder='Select A Lesson' fluid open={selectorIsVisible}>
                                                        <Dropdown.Menu className="menu">
                                                            <Dropdown.Item>
                                                                <Link to={{pathname: "/thebrain-neuraltube", state: {selectorIsVisible: false}}} className='navText'>Neural Tube</Link>
                                                            </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/thebrain-earlydevelopment", state: {selectorIsVisible: false}}} className='navText'>Early Development</Link>
                                                        </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/thebrain-lobes", state: {selectorIsVisible: false}}} className='navText'>Lobes</Link>
                                                        </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/thebrain-structure", state: {selectorIsVisible: false}}} className='navText'>Structure and Function</Link>
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

export default EarlyBrainDevelopmentPage;


