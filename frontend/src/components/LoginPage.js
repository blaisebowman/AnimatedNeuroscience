import React, {useState} from "react";
import {Button, Card, Divider, Form, Grid, Header, Icon, Image, Input, Message, Segment} from "semantic-ui-react"
import {Link} from "react-router-dom";

function LoginPage(props) {
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [errorStateEmail, setErrorStateEmail] = useState("");
    const [errorStatePassword, setErrorStatePassword] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}/;
    function checkBadCharacters (email, password) {
        //check to make sure the email and password are in the proper format prior to making comparisons in the backend
        if (!(emailRegex.test(email))) {
            setErrorStateEmail("Please enter a valid email address.");
        }
        if (!(passwordRegex.test(password))) {
            setErrorStatePassword("Please enter a valid password.");
        } else if (password.length > 20) {
            setErrorStatePassword("Passwords must be between 8-20 characters.")
        }
    }

    function handleChangePassword(){
        setErrorStatePassword("");
    }
    function handleChangeEmail(){
        setErrorStateEmail("");
    }

    function handleSubmit (email, password){
        checkBadCharacters(email, password);
        if(errorStateEmail.length === 0 && errorStatePassword.length === 0){
            //THEN check with the backend for both email and password. Then display relevant error message.

            console.log("Successful submission");
            setEmail(email);
            setPassword(password);
        }
        else {
            console.log("Unsuccessful submission");
        }
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
                                                        error = {errorStateEmail !== "" ? errorStateEmail : false}
                                                        onChange={handleChangeEmail}
                                                    />
                                                    <Form.Field
                                                        control={Input}
                                                        label='Password'
                                                        placeholder=''
                                                        error = {errorStatePassword !== "" ? errorStatePassword : false}
                                                        onChange = {handleChangePassword}
                                                    />
                                                    <Link to = "/register">Forgot your password?</Link>
                                                    {/*
                                                    Link to a pop-up that connects to the backend, prompts for email, sends email to user link to one-time login.
                                                    Link directs user to reset their password. Have as a seperate page.
                                                    */}
                                                <Divider/>
                                                    <Form.Button content='Submit' color='blue' />
                                                </Form>
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