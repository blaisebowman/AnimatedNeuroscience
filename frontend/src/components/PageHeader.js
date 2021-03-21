import React from 'react';
import {Link} from "react-router-dom";
import {Image, Grid, Header, Button, Card, Divider, Dropdown, Icon, Segment, Container} from 'semantic-ui-react';
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
    return (
        <Header as='h2' className='modGrid' style={{maxHeight: '100vh'}}>
            <Grid columns={3} rows={2} className='modGrid' stretched style={{maxWidth: '100vw'}}>
                <Grid.Column className='modGrid'>
                   {/* <Container className="headerContainer">
                    </Container>*/}
                </Grid.Column>
                <Grid.Column className='noPadding' style={{maxWidth: '100vh'}}>
                    <Image src={hometitle2} fluid/>
                </Grid.Column>
                <Grid.Column className='modGrid' floated='right' textAlign='right'>
                    {
                        <Grid columns={3} rows={1} className='modGrid'>
                            <Grid.Column>
                                <Button fluid color='blue' onClick={()=> openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')} className='headerButton'><Icon name='github'/>Repository</Button>
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
                        /*Add Register/Sign-Up Buttons to the Header
                        * Make a single login-page / register page
                        * Update the header, based on the state of the user (if user show account settings options, etc.)
                        *
                        * */
                    }
                </Grid.Column>
            </Grid>
        </Header>

    );
}

export default PageHeader;