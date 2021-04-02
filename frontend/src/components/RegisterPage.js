import React, {useState} from "react";
import {Button, Card, Divider, Grid, Icon, Segment, Form, Input, Message} from "semantic-ui-react"
import {MessageLogin, SubmitButton} from "../styledComponents";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';

function RegisterPage(props) {
    const [redirect, setRedirect] = useState(false);
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [errorStateFirst, setErrorStateFirst] = useState("");
    const [errorStateLast, setErrorStateLast] = useState("");
    const [errorStateEmail, setErrorStateEmail] = useState("");
    const [errorStatePassword, setErrorStatePassword] = useState("");
    const [errorStatePasswordConfirm, setErrorStatePasswordConfirm] = useState("");
    const [errorStateCheck, setErrorStateCheck] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [isMaskedPassword, setIsMaskedPassord] = useState("password");
    const [isMaskedPasswordConfirm, setIsMaskedPassordConfirm] = useState("password");
    const nameRegex = /^(?!-)(?!.*-$)[a-zA-Z-]/;
    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}/;

    if(process.env.NODE_ENV === 'production'){
        console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function (){};
    }

    function toggleMask(e, {name}){
        e.preventDefault(); //prevent page from re-rendering
        if (name === "password"){
            if(isMaskedPassword === "password"){
                setIsMaskedPassord("text");
            }
            else {
                setIsMaskedPassord("password");
            }
        }
        else if (name === "passwordConfirm"){
            if(isMaskedPasswordConfirm === "password"){
                setIsMaskedPassordConfirm("text");
            }
            else {
                setIsMaskedPassordConfirm("password");
            }
        }
    }

    function checkBadCharacters (first, last, password, passwordConfirmation, email){
        if(!(nameRegex.test(first))){
            setErrorStateFirst("Please enter a valid first name.");
        }
        if(!(nameRegex.test(last))){
            setErrorStateLast("Please enter a valid last name.");
        }
        if(!(emailRegex.test(email))){
            setErrorStateEmail("Please enter a valid email address.");
        }
        if(!(passwordRegex.test(password))){
            setErrorStatePassword("Please enter a valid password.");
        }
        else if(password.length > 20){
            setErrorStatePassword("Passwords must be between 8-20 characters.")
        }
        if(!(passwordRegex.test(passwordConfirm)) ){
            setErrorStatePasswordConfirm("Please enter a valid password.");
        }
        if(password !== passwordConfirm){
            setErrorStatePassword("Passwords do not match.");
            setErrorStatePasswordConfirm("Passwords do not match.");
        }
        if (errorStateCheck !== "checked"){
            setErrorStateCheck("Please agree to the terms and conditions.");
        }
    }

    function handleChangeFirst(e, {name, value}){
        setErrorStateFirst("");
        setFirst(value);
    }

    function handleChangeLast(e, {name, value}){
        setErrorStateLast("");
        setLast(value);
    }

    function handleChangePassword(e, {name, value}){
        setErrorStatePassword("");
        setPassword(value);
    }

    function handleChangePasswordConfirm(e, {name, value}){
        setErrorStatePasswordConfirm("");
        setPasswordConfirm(value);
    }

    function handleChangeEmail(e, {name, value}){
        setErrorStateEmail("");
        setEmail(value);
    }

    function handleChangeCheck(e, {name, value}){
        if(errorStateCheck !== "checked"){
            setErrorStateCheck("checked");
        }
        else {
            setErrorStateCheck("");
        }
    }

   async function handleSubmit (){
        console.log(errorStateCheck);
        console.log(errorStateFirst);
        console.log(errorStateLast);
        console.log(errorStatePassword);
        console.log(errorStatePasswordConfirm);
        console.log(errorStateEmail);
        checkBadCharacters(first, last, password, passwordConfirm, email);
        if(errorStateFirst.length === 0 && errorStateLast.length === 0 && errorStateEmail.length === 0 && errorStatePassword.length === 0 && errorStatePasswordConfirm.length === 0 && errorStateCheck === "checked"){
            //CHECK IF EMAIL IS ALREADY WITHIN THE DATA-BASE, then prompt login page or forgot password.
            console.log("Successful submission");
            setFirst(first);
            setLast(last);
            setPassword(password);
            setPasswordConfirm(passwordConfirm);
            setEmail(email);
            let port = process.env.PORT || 'http://localhost:8080/api/members/register'
            await axios.post(port, {
                member_first: first,
                member_last: last,
                member_email: email,
                member_password: password,
                member_password_confirm: passwordConfirm,
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
                    console.log(error.response);
                    console.log(error.response.headers);
                    console.log(error.response.status);
                });
        }
        else {
            console.log("Unsuccessful submission");
        }
        //if first is invalid, or empty, display relevant error
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
                                                    <MessageLogin>
                                                        <Message.Header>Create an Account!</Message.Header>
                                                    <Divider/>
                                                        <Card.Description>
                                                            Monitor your progress and hit your learning goals!
                                                        </Card.Description>
                                                    </MessageLogin>
                                                </Card.Content>

                                                <Card.Content extra>
                                                    <Form onSubmit={handleSubmit}>
                                                        <Form.Group widths='equal'>
                                                            <Form.Field
                                                                control={Input}
                                                                label='First Name'
                                                                placeholder='John'
                                                                name='first'
                                                                value={first}
                                                                error={errorStateFirst !== "" ? errorStateFirst : false}
                                                                onChange={handleChangeFirst}
                                                            />
                                                            <Form.Field
                                                                control={Input}
                                                                label='Last Name'
                                                                placeholder='Doe'
                                                                name='last'
                                                                value={last}
                                                                error={errorStateLast !== "" ? errorStateLast : false}
                                                                onChange={handleChangeLast}
                                                            />
                                                        </Form.Group>
                                                        <Message size='mini' attached='bottom'>Passwords must be between
                                                            8-20 characters and contain at least one number, one
                                                            upper-case letter, and one lower-case letter. </Message>
                                                        <Form.Field
                                                            type= {isMaskedPassword}
                                                            control={Input}
                                                            label='Password'
                                                            placeholder=''
                                                            name='password'
                                                            value={password}
                                                            error={errorStatePassword.length !== 0 ? errorStatePassword : false}
                                                            onChange={handleChangePassword}
                                                            /*onClick={checkCapsLock}
                                                            onKeyDown={checkCapsLock}*/

                                                            action={<Button.Group basic>
                                                                <Button icon onClick={toggleMask} name='password'><Icon name='eye'/></Button>
                                                            </Button.Group>
                                                            }
                                                        />
                                                        <Form.Field
                                                        type= {isMaskedPasswordConfirm}
                                                        control={Input}
                                                        label='Confirm Password'
                                                        placeholder=''
                                                        name='passwordConfirm'
                                                        value={passwordConfirm}
                                                        error={errorStatePasswordConfirm.length !== 0 ? errorStatePasswordConfirm : false}
                                                        onChange={handleChangePasswordConfirm}
                                                        /*onClick={checkCapsLock}
                                                        onKeyDown={checkCapsLock}*/
                                                        action={<Button.Group basic>
                                                            <Button icon onClick={toggleMask} name='passwordConfirm'><Icon name='eye'/></Button>
                                                        </Button.Group>
                                                        }
                                                    />
                                                        <Form.Field
                                                            control={Input}
                                                            label='Email'
                                                            placeholder='allygator@fakeemail.com'
                                                            name='email'
                                                            value={email}
                                                            error={errorStateEmail !== "" ? errorStateEmail : false}
                                                            onChange={handleChangeEmail}
                                                        />
                                                        <Form.Checkbox
                                                            label='I Agree to the Terms and Conditions of An Animated Discovery of Neuroscience.'
                                                            onChange={handleChangeCheck}
                                                            error={(errorStateCheck.length !== 0 && errorStateCheck !== "checked") ? errorStateCheck : false}
                                                            onClick={handleChangeCheck}
                                                        />
                                                        <Form.Button content='Submit' color='blue'/>
                                                    </Form>
                                                    <Divider/>
                                                    <Link to="/login">Already a Member? <u>Login</u>.</Link>
                                                    {redirect &&
                                                    <Redirect to={'/introduction'}/>
                                                    }
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                        <Grid.Column width={4}/>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </div>
                </Segment>
            </div>

        );
}

export default RegisterPage;