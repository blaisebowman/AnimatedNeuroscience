import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Image, Grid, Header, Button, Icon} from 'semantic-ui-react';
import hometitle2 from '../images/hometitle2.jpg';
import {MobileHeader} from "../styledComponents";
import {IconContext} from "react-icons";
import {BiBrain} from "react-icons/bi"
import '../header.css';

function PageHeader(props) {
    const [redirectingToHome, setRedirectingToHome] = useState(false);
    const [id, setId] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const openRepository = (url) => {
        const newTabOpened = window.open(url, '_blank', 'noopner, norefferer');
        //open in new window to avoid security issues with _blank
        if (newTabOpened) {
            newTabOpened.opener = null;
        }
    }

    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // let id = ""; //get id from backend -> upon a valid login or registration, user is directed to this page.
    /*if(sessionStorage.getItem("memberLoggedIn")){
        setId(sessionStorage.getItem("id"));
    }*/

    function handleLogOut() {
        setRedirectingToHome(true);
    }


    useEffect(() => {
        console.log(redirectingToHome);
        if (redirectingToHome === true) {
            console.log("GOING HOME");
            sessionStorage.clear();
            setId("");
            //setRedirectingToHome(false);
        } else if (sessionStorage.getItem("memberLoggedIn")) {
            setId(sessionStorage.getItem("id"));
            console.log(id);
            setRedirectingToHome(false);
        }
        console.log(sessionStorage);

    }, [redirectingToHome]);
    if (isMobile === false) {
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
                            <Grid.Column>
                                <Button fluid color='blue'
                                        onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}
                                        className='headerButton'><Icon name='github'/>Repository</Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button fluid color='orange' className='headerButton'>
                                    <Link to={{pathname: "/settings"}} className='headerButton'>My Account <Icon
                                        name='user'/></Link>
                                </Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button fluid color='orange' className='headerButton'
                                        onClick={handleLogOut}>Logout</Button>
                                {redirectingToHome &&
                                <Redirect to={'/introduction'}/>
                                }
                            </Grid.Column>
                        </Grid>
                        }
                    </Grid.Column>
                </Grid>
            </Header>
        );
    }
    else {
        return(
        <Header as='h2'>
            <Grid columns={3} rows={2} className='modGrid' stretched>
                <Grid.Row>
                <Grid.Column width={2} textAlign='left' verticalAlign='middle'>
                    <MobileHeader>
                        <IconContext.Provider value={{color: 'white', size: '1em'}}>
                                <BiBrain/>
                        </IconContext.Provider>
                    </MobileHeader>
                </Grid.Column>
                <Grid.Column fluid textAlign='left' width={8} verticalAlign='middle'>
                    <MobileHeader as='h4' verticalAlign='middle'>
                        <i>An Animated Discovery of Neuroscience</i>
                    </MobileHeader>
                </Grid.Column>
                    {id === "" &&
                    <Grid.Column width={6}>

                        <Grid.Row>
                            <Button fluid color='orange' className='headerButton'>
                                <Link to={{pathname: "/register"}} className='headerButton'>Sign Up</Link>
                            </Button>
                        </Grid.Row>
                        <Grid.Row>
                            <Button fluid color='orange' className='headerButton'>
                                <Link to={{pathname: "/login"}} className='headerButton'>Login</Link>
                            </Button>
                        </Grid.Row>
                        <Grid.Row>
                            <Button fluid color='blue'
                                    onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}
                                    className='headerButton'><Icon name='github'/>Repository</Button>
                        </Grid.Row>
                    </Grid.Column>
                    }
                    {id !== "" &&
                   <Grid.Column width={6}>
                       <Grid.Row>
                           <Button fluid color='orange' className='headerButton'>
                               <Link to={{pathname: "/settings"}} className='headerButton'>My Account <Icon
                                   name='user'/></Link>
                           </Button>
                       </Grid.Row>
                       <Grid.Row>
                           <Button fluid color='orange' className='headerButton'
                                   onClick={handleLogOut}>Logout</Button>
                           {redirectingToHome &&
                           <Redirect to={'/introduction'}/>
                           }
                       </Grid.Row>
                       <Grid.Row>
                           <Button fluid color='blue'
                                   onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}
                                   className='headerButton'><Icon name='github'/>Repository</Button>
                       </Grid.Row>
                   </Grid.Column>
                    }
                </Grid.Row>
            </Grid>
        </Header>
        );
    }
}

export default PageHeader;