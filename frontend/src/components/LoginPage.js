import React, {useState} from "react";
import {Button, Card, Divider, Form, Grid, Header, Icon, Image, Input, Message, Segment} from "semantic-ui-react"
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

function LoginPage(props) {
    const [redirect, setRedirect] = useState(false);
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [errorStateEmail, setErrorStateEmail] = useState("");
    const [errorStatePassword, setErrorStatePassword] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [capsLockEmail, setCapsLockEmail] = useState(false);
    const [capsLockPassword, setCapsLockPassword] = useState(false);
    const [currentInputForm, setCurrentInputForm] = useState("");
    const [isCaps, setIsCaps] = useState(false);
    const [isMasked, setIsMasked] = useState("password");
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}/;
    if(process.env.NODE_ENV === 'production'){
        console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function (){};
    }
    function checkCapsLock(e){
        const deviceIsMac = /Mac/.test(navigator.platform);
        console.log(e.target.name);
        console.log(e._reactName);
        console.log(e.keyCode);
        if((e._reactName === "onClick") && (currentInputForm !== e.target.name)){
            if(e.target.name === "email" && capsLockPassword === true){
                setCapsLockEmail(true)
                setCapsLockPassword(false);
            }
            else if (e.target.name === "password" && capsLockEmail === true){
                setCapsLockEmail(false);
                setCapsLockPassword(true);
            }
            setCurrentInputForm(e.target.name);
        }
        else if (((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === false){
            if(e.target.name === "email"){
                if(capsLockEmail === true){
                    return;
                }
                else if (capsLockPassword === true){
                    setCapsLockPassword(false);
                }
                else {
                    setCapsLockEmail(true);
                }
            }
            else if (e.target.name === "password"){
                if(capsLockPassword === true){
                    return;
                }
                else if (capsLockEmail === true){
                    setCapsLockEmail(false);
                }
                else {
                    setCapsLockPassword(true);
                }
            }
            setIsCaps(true);
        }
        else if(((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === true){
            setCapsLockEmail(false);
            setCapsLockPassword(false);
            setIsCaps(false);
        }
    }

    function checkBadCharacters (email, password) {
        //check to make sure the email and password are in the proper format (prior to making comparisons in the backend).
        if (!(emailRegex.test(email))) {
            setErrorStateEmail("Please enter a valid email address.");
        }
        if (!(passwordRegex.test(password))) {
            setErrorStatePassword("Your password is incorrect. Please double-check your password.");
        }
    }

    function handleChangeEmail(e, {name, value}){
        console.log(e);
        //track the value in the email form field as a user types.
        setErrorStateEmail("");
        setEmail(value);
    }

    function handleChangePassword(e, {name, value}){
        //track the value in the password form field as a user types.
        if(password.length !== 0){
            setErrorStatePassword("");
        }
        setPassword(value);
    }

    async function handleSubmit (){
        console.log("email: " + email + "\npassword: " + password);
        console.log("Email error state: " + errorStateEmail + "\nPassword error state: " + errorStatePassword);
        checkBadCharacters(email, password);
        console.log("Email error state: " + errorStateEmail + "\nPassword error state: " + errorStatePassword);
        if((errorStateEmail.length === 0 && errorStatePassword.length === 0) && (email.length >=3 && password.length >=8)){
            setEmail(email);
            setPassword(password);
            setEmail(email);
            //axios get request to retrieve a user's login credentials and return a user's _id.
            let port = process.env.PORT || 'http://localhost:8080/api/members/login'
            await axios.post(port, {
                member_email: email,
                member_password: password,
            }, {headers: {'Content-Type': 'application/json'}})
                .then(function(response) {
                    console.log(response.data);
                    setRedirect(true);
                    sessionStorage.setItem('id', response.data);
                    sessionStorage.setItem('memberLoggedIn', "true");
                    sessionStorage.setItem('reload', "true");

                    /*setFirst('');
                    setLast('');
                    setPassword('');
                    setPasswordConfirm('');
                    setEmail('');*/
                }).catch(function(error) {
                    console.log(error.response.data.loginEmailError);
                    console.log(error.response.data.loginPasswordError);
                    console.log(error.response.status);
                    if (error.response.data.loginEmailError !== undefined){
                        setErrorStateEmail(error.response.data.loginEmailError);
                    }
                    else {
                        setErrorStateEmail("");
                    }
                    if (error.response.data.loginPasswordError !== undefined){
                        setErrorStatePassword(error.response.data.loginPasswordError);
                    }
                    else {
                        setErrorStatePassword("");
                    }
                    console.log("Error validating user credentials in the backend.");
                });
        }
        else {
            console.log("Unsuccessful submission.");
        }
    }

    function toggleMask(){

    }

    return (
        <div className="App">
            <Segment className="body">
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid columns={3}>
                                    <Grid.Column width={4}/>
                                    <Grid.Column width={8} className={'firstCol'}>
                                        <Card fluid>
                                            <Card.Content>
                                                <Card.Description>Login to your Account</Card.Description>
                                            </Card.Content>
                                            <Card.Description>
                                                Welcome Back!
                                            </Card.Description>
                                            <Card.Content extra>
                                                <Form onSubmit={handleSubmit}>
                                                    <Form.Field
                                                        control={Input}
                                                        label='Email'
                                                        placeholder=''
                                                        name='email'
                                                        value={email}
                                                        error = {errorStateEmail !== "" ? errorStateEmail : false}
                                                        onChange={handleChangeEmail}
                                                        onClick={checkCapsLock}
                                                        onKeyUp={checkCapsLock}
                                                    />
                                                    {capsLockEmail &&
                                                    <Message content='Warning: Caps Lock is enabled.' color='yellow'/>
                                                    }
                                                    <Form.Field
                                                        type= {isMasked}
                                                        control={Input}
                                                        label='Password'
                                                        placeholder=''
                                                        name='password'
                                                        value={password}
                                                        error={errorStatePassword !== "" ? errorStatePassword : false}
                                                        onChange={handleChangePassword}
                                                        onClick={checkCapsLock}
                                                        onKeyDown={checkCapsLock}
                                                    />
                                                    {/*<Button icon='eye' onClick={toggleMask}/>*/}
                                                    {capsLockPassword &&
                                                    <Message content='Warning: Caps Lock is enabled.' color='yellow'/>
                                                    }
                                                    <Link to = "/register">Forgot your password?</Link>
                                                    {/*
                                                    Link to a pop-up that connects to the backend, prompts for email, sends email to user link to one-time login.
                                                    Link directs user to reset their password. Have as a seperate page.
                                                    */}
                                                <Divider/>
                                                    <Form.Button content='Submit' color='blue' />
                                                </Form>
                                                {redirect &&
                                                <Redirect to={{pathname: '/introduction'}}/>
                                                }
                                            </Card.Content>
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

export default LoginPage;