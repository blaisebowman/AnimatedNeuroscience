import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from "react-router";
import {Grid, GridColumn, Segment, Image, Divider, List, Icon, Card,} from "semantic-ui-react";
import '../introduction.css';
import cise from '../images/cise.jpg';

function Introduction(props) {
    useEffect(()=>{
        console.log("done")
        if(sessionStorage.getItem("reload") === "true"){
            console.log("redirecting (reloading) from either register or login");
            sessionStorage.setItem('reload', "false");
            window.location.reload();
        }
    });

    let id = ""; //get id from backend -> upon a valid login or registration, user is directed to this page.
    if(sessionStorage.getItem("memberLoggedIn")){
        id = sessionStorage.getItem("id");
        console.log(id);
        /*history.push(event.target.value + id);*/
    }

    return (
        <div className="App">
            <Segment className="body">
                <div className="modGrid">
                    <Grid className="introduction" style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid columns={2}>
                                    <Grid.Column columnWidth = {8}>
                                        <Grid.Row>
                                            <Grid columns={2}>
                                            <Grid.Column><Card>
                                                <Image src={cise}/>
                                                <Card.Description>
                                                    Senior Project
                                                </Card.Description>
                                            </Card></Grid.Column>
                                            <Grid.Column>
                                                <Card>
                                                    <Card.Description>
                                                        Objective
                                                    </Card.Description>
                                                    <Card.Content textAlign='left'>
                                                        This web site is intended to provide basic
                                                        developmental, anatomical, and physiological information regarding the brain
                                                        and its basic functional unit, the neuron, in the form of easy to grasp
                                                        animations.
                                                    </Card.Content>
                                                </Card>
                                                <Card>
                                                    <Card.Description>
                                                       Audience
                                                    </Card.Description>
                                                    <Card.Content textAlign='left'>
                                                        The target audience is the senior undergraduate and/or beginning
                                                        graduate student interested in pursuing a research career in "Computational
                                                        Neuroscience".
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                        </Grid>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Divider>

                                            </Divider>

                                        </Grid.Row>
                                    </Grid.Column>
                                    <Grid.Column columnWidth={8}>
                                        <Card fluid>
                                            <Card.Content textAlign='left'>
                                                The site is the result of a continuing
                                                series of undergraduate senior projects performed under the guidance of Dr.
                                                Arunava Banerjee from the CISE department at the University of Florida. The
                                                current list of contributors (which is expected to grow as more senior
                                                projects contribute to this site) are:
                                            </Card.Content>
                                        </Card>
                                        <Divider horizontal/>
                                        <Card fluid>
                                            <Card.Description>
                                                Contributors
                                                <Icon name='users' className='iconContributor'/>
                                            </Card.Description>
                                            <Card.Content>
                                                <List divided relaxed className="contributors">
                                                <List.Item>Kelly A. Haiber (Fall '04, Spring '05)</List.Item>
                                                <List.Item>Paul W. Sze (Fall '04)</List.Item>
                                                <List.Item>Christina M. Sirois (Fall '04)</List.Item>
                                                <List.Item>Marwan E. Shaikh (Spring '05)</List.Item>
                                                <List.Item>Maria Chavero (Spring '05)</List.Item>
                                                <List.Item>Eric J. Mousseau (Spring '05)</List.Item>
                                                <List.Item>Keith D. Barbag (Fall '05)</List.Item>
                                                <List.Item>Chris Romero (Summer '06)</List.Item>
                                                <List.Item>Nasser Ayad (Fall '06)</List.Item>
                                                <List.Item>Brent Ford (Summer '07)</List.Item>
                                                <List.Item>Hristian Petkov (Fall '07)</List.Item>
                                                <List.Item>Nathanael Hooper (Spring '19)</List.Item>
                                                <List.Item>Joseph Martinez (Spring '19)</List.Item>
                                                <List.Item>Keith Salzman (Spring '19)</List.Item>
                                                <List.Item>Alyson Knowles (Spring '19)</List.Item>
                                                <List.Item>Blaise Bowman (Spring '21)</List.Item>
                                            </List></Card.Content>
                                        </Card>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                        <GridColumn className='noPadding'/>
                    </Grid>
                </div>
            </Segment>
        </div>
    );
}

export default Introduction;
