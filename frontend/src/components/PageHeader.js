import React from 'react';
import {Link} from "react-router-dom";
import {Image, Grid, Header, Button, Card, Divider, Dropdown, Icon} from 'semantic-ui-react';
import hometitle2 from '../images/hometitle2.jpg';
import icon from '../images/WebHeader.jpg';
import '../header.css';


function PageHeader(props) {
    const openRepository = (url) => {
        const newTabOpened = window.open(url, '_blank', 'noopner, norefferer');
        //open in new window to avoid security issues with _blank
        if (newTabOpened){
            newTabOpened.opener = null;
        }
    }

    let id = ""; //get id from backend -> upon a valid login or registration, user is directed to this page.
    if(sessionStorage.getItem("memberLoggedIn")){
        id = sessionStorage.getItem("id");
        /*history.push(event.target.value + id);*/
    }


    return (
        <Header as='h2' className='modGrid' style={{maxHeight: '100vh'}}>
            <Grid columns={3} rows={2} className='modGrid' stretched style={{maxWidth: '100vw'}}>
                <Grid.Column className='modGrid'/>
                <Grid.Column className='noPadding' style={{maxWidth: '100vh'}}>
                    <Image src={hometitle2} fluid/>
                </Grid.Column>
                <Grid.Column className='modGrid' floated='right' textAlign='right'>
                    {id === "" &&
                    <Grid columns={3} rows={1} className='modGrid'>
                        <Grid.Column>
                            <Button fluid color='blue'
                                    onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}
                                    className='headerButton'><Icon name='github'/>Repository</Button>
                        </Grid.Column>
                        <Grid.Column className='buttonColumn'>
                            <Button fluid color='orange' className='headerButton'>
                                <Link to={{pathname: "/register"}} className='headerButton'>Sign Up</Link>
                            </Button>
                        </Grid.Column>
                        <Grid.Column className='buttonColumn'>
                            <Button fluid color='orange' className='headerButton'>
                                <Link to={{pathname: "/login"}} className='headerButton'>Login</Link>
                            </Button>
                        </Grid.Column>
                    </Grid>
                    }
                    {id !== "" &&
                    <Grid columns={3} rows={1} className='modGrid'>
                        <Grid.Column/>
                        <Grid.Column>
                            <Button fluid color='blue'
                                    onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}
                                    className='headerButton'><Icon name='github'/>Repository</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button fluid color='orange' className='headerButton'>
                                <Link to={{pathname: "/settings"}} className='headerButton'>My Account <Icon name = 'user'/></Link>
                            </Button>
                        </Grid.Column>
                    </Grid>
                    }
                </Grid.Column>
            </Grid>
        </Header>
    );
}

export default PageHeader;