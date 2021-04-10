import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Image, Grid, Header, Button, Icon} from 'semantic-ui-react';
import hometitle2 from '../images/hometitle2.jpg';
import { MobileContainerHeader, MobileHeader, MobileHeaderButton} from "../styledComponents";
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

    /*DETERMINE IF MOBILE VIEW -> In the future, rewrite in React-Native, then use react-native-web to convert.
   Due to mobile optimization being out of the scope of the project until much later in the development cycle,
   this is a workaround.*/
    //TODO -> BEFORE ANY PUSH TO REPO -> ENSURE THE FOLLOWING 3 LINES ARE COMMENTED (FOR NOW)
    /*navigator.__defineGetter__('userAgent', function () {
        //ANDROID
        return "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.105 Mobile Safari/537.36"
        //iPhone
        /!*
        return "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.163 Mobile/15E148 Safari/604.1"
        *!/
    });*/
    let isMobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


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
                            <Grid.Column className='buttonColumn' width={5}>
                                <MobileHeaderButton fluid color='blue'
                                        onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}><Icon name='github'/>Repository</MobileHeaderButton>
                            </Grid.Column>
                            <Grid.Column className='buttonColumn' width={5}>
                                <Button fluid color='orange' className='headerButton'>
                                    <Link to={{pathname: "/register"}} className='headerButton'>Sign Up</Link>
                                </Button>
                            </Grid.Column>
                            <Grid.Column className='buttonColumn'width={5}>
                                <Button fluid color='orange' className='headerButton'>
                                    <Link to={{pathname: "/login"}} className='headerButton'>Login</Link>
                                </Button>
                            </Grid.Column>
                        </Grid>
                        }
                        {id !== "" &&
                        <Grid columns={3} rows={1} className='modGrid'>
                            <Grid.Column width={5}>
                                <MobileHeaderButton fluid color='blue' onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}><Icon name='github'/>Repository</MobileHeaderButton>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <MobileHeaderButton fluid color='orange'>
                                    <Link to={{pathname: "/settings"}}><Icon name='user'/>My Account </Link>
                                </MobileHeaderButton>
                            </Grid.Column>
                            <Grid.Column width={5}>
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
        <MobileContainerHeader as='h2'>
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
                            <MobileHeaderButton fluid color='orange'>
                                <Link to={{pathname: "/register"}}>Sign Up</Link>
                            </MobileHeaderButton>
                        </Grid.Row>
                        <Grid.Row>
                            <MobileHeaderButton fluid color='orange'>
                                <Link to={{pathname: "/login"}}>Login</Link>
                            </MobileHeaderButton>
                        </Grid.Row>
                        <Grid.Row>
                            <MobileHeaderButton fluid color='blue' onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}>
                                <Icon name='github'/>
                                Repository
                            </MobileHeaderButton>
                        </Grid.Row>
                    </Grid.Column>
                    }
                    {id !== "" &&
                   <Grid.Column width={6}>
                       <Grid.Row>
                           <MobileHeaderButton fluid color='orange'>
                               <Link to={{pathname: "/settings"}}><Icon name='user'/>My Account </Link>
                           </MobileHeaderButton>
                       </Grid.Row>
                       <Grid.Row>
                           <MobileHeaderButton fluid color='orange' onClick={handleLogOut}>Logout</MobileHeaderButton>
                           {redirectingToHome &&
                           <Redirect to={'/introduction'}/>
                           }
                       </Grid.Row>
                       <Grid.Row>
                           <MobileHeaderButton fluid color='blue' onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}>
                               <Icon name='github'/>
                               Repository
                           </MobileHeaderButton>
                       </Grid.Row>
                   </Grid.Column>
                    }
                </Grid.Row>
            </Grid>
        </MobileContainerHeader>
        );
    }
}

export default PageHeader;