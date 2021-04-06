import React, {Component, useEffect, useReducer, useState, useRef, useCallback} from 'react';
import {Link, useHistory} from "react-router-dom";
import Astrocyte from "./Animations/astrocyte";
import {Grid, GridColumn, Segment, Dropdown, Card, } from "semantic-ui-react";

import '../glias.css';
import {CustomAnimationDropdown} from "../styledComponents";


function AstrocytePage(props) {
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
            <Segment className="body">
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid columns={3}>
                                    <GridColumn width={12}>
                                        <Segment className="adobeSeg"  style={{width: width, height: height}}>
                                            <Astrocyte/>
                                        </Segment>
                                    </GridColumn>
                                    <Grid.Column width={4} className="gridParent">
                                        <Card className="category">
                                            <div onMouseEnter={handleSelector}
                                                 onMouseLeave={handleSelector}>
                                                <Grid textAlign='center' rows={4} className="dropdownContainer"
                                                      verticalAlign='middle'>
                                                    <CustomAnimationDropdown placeholder='Select A Lesson' fluid = {true} open={selectorIsVisible}>
                                                        <Dropdown.Menu className="menu" fluid="true">
                                                            <Dropdown.Item>
                                                                <Link to={{pathname: "/gliasandsynapses-astrocyte", state: {selectorIsVisible: false}}} className='navText'>Astrocyte</Link>
                                                            </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/gliasandsynapses-oligodendroglia", state: {selectorIsVisible: false}}} className='navText'>Oligodendroglia</Link>
                                                        </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/gliasandsynapses-chemical", state: {selectorIsVisible: false}}} className='navText'>Chemical Synpases</Link>
                                                        </Dropdown.Item><Dropdown.Item>
                                                            <Link to={{pathname: "/gliasandsynapses-cns", state: {selectorIsVisible: false}}} className='navText'>CNS Synapses</Link>
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
            </Segment>
        </div>
    );
}

export default AstrocytePage;


