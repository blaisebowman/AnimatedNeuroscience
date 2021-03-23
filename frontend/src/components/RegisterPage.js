import React, {useState} from "react";
import {Button, Card, Divider, Grid, Header, Icon, Image, Segment, Form, Input, Message, List} from "semantic-ui-react"
import {Link} from "react-router-dom";

function RegisterPage(props) {
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
    const nameRegex = /^(?!-)(?!.*-$)[a-zA-Z-]+$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    //const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/;

    function checkBadCharacters (first, last, password, passwordConfirm, email){
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

    function handleChangeFirst(){
        setErrorStateFirst("");
    }
    function handleChangeLast(){
        setErrorStateLast("");
    }
    function handleChangePassword(){
        setErrorStatePassword("");
    }
    function handleChangePasswordConfirm(){
        setErrorStatePasswordConfirm("");
    }
    function handleChangeEmail(){
        setErrorStateEmail("");
    }
    function handleChangeCheck(){
        if(errorStateCheck !== "checked"){
            setErrorStateCheck("checked");
        }
        else {
            setErrorStateCheck("");
        }
    }

    function handleSubmit (first, last, password, passwordConfirm, email){
        console.log(errorStateCheck);
        checkBadCharacters(first, last, email);
        if(errorStateFirst.length === 0 && errorStateLast.length === 0 && errorStateEmail.length === 0 && errorStatePassword.length === 0 && errorStatePasswordConfirm.length === 0 && errorStateCheck === "checked"){
            //CHECK IF EMAIL IS ALREADY WITHIN THE DATA-BASE, then prompt login page or forgot password.
            console.log("Successful submission");
            setFirst(first);
            setLast(last);
            setPassword(password);
            setPasswordConfirm(passwordConfirm);
            setEmail(email);
        }
        else {
            console.log("Unsuccessful submission");
        }
        //if first is invalid, or empty, display relevant error
        //consider for the time being, providing a one-time four digit pin to the user and have that as the password.
        //if forgot pin, sends an email with a newly random 4-digit pin.
        //go this way for now.
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
                                                <Card.Description>Create an Account</Card.Description>
                                            </Card.Content>
                                            <Card.Description>
                                                Monitor your progress and hit your learning goals!
                                            </Card.Description>
                                            <Card.Content extra>
                                                <Form onSubmit={handleSubmit}>
                                                    <Form.Group widths='equal'>
                                                        <Form.Field
                                                            control={Input}
                                                            label='First Name'
                                                            placeholder='John'
                                                            error = {errorStateFirst !== "" ? errorStateFirst : false}
                                                            onChange = {handleChangeFirst}
                                                        />
                                                        <Form.Field
                                                            control={Input}
                                                            label='Last Name'
                                                            placeholder='Doe'
                                                            error = {errorStateLast !== "" ? errorStateLast : false}
                                                            onChange = {handleChangeLast}
                                                        />
                                                    </Form.Group>
                                                        <Form.Field
                                                            control={Input}
                                                            label='Password'
                                                            placeholder=''
                                                            error = {errorStatePassword !== "" ? errorStatePassword : false}
                                                            onChange = {handleChangePassword}
                                                        />
                                                        <Message size='mini' attached='bottom'>Password must be between 8-20 characters and contain at least one number, one upper-case letter, and one lower-case letter. </Message>
                                                        <Form.Field
                                                            control={Input}
                                                            label='Confirm Password'
                                                            placeholder=''
                                                            error = {errorStatePasswordConfirm.length !== 0 ? errorStatePasswordConfirm : false}
                                                            onChange = {handleChangePasswordConfirm}
                                                        />
                                                    <Form.Field
                                                        control={Input}
                                                        label='Email'
                                                        placeholder='allygator@fakeemail.com'
                                                        error = {errorStateEmail !== "" ? errorStateEmail : false}
                                                        onChange={handleChangeEmail}
                                                    />
                                                    <Form.Checkbox label='I agree to the Terms and Conditions of An Animated Discovery of Neuroscience.' onChange = {handleChangeCheck}
                                                                   error = {(errorStateCheck.length !== 0 && errorStateCheck !== "checked") ? errorStateCheck : false}
                                                                   onClick = {handleChangeCheck}
                                                    />
                                                    <Form.Button content='Submit' color='blue' />
                                                </Form>
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