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
    const [errorStatePasswordVerify, setErrorStatePasswordVerify] = useState("");
    const [errorStateCheck, setErrorStateCheck] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [email, setEmail] = useState("");
    const nameRegex = /^(?!-)(?!.*-$)[a-zA-Z-]+$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    function checkBadCharacters (first, last, password, passwordVerify, email){
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
        if(!(passwordRegex.test(passwordVerify))){
            setErrorStatePasswordVerify("Please enter a valid password.");
        }
        if(password !== passwordVerify){
            setErrorStatePassword("Passwords do not match.");
            setErrorStatePasswordVerify("Passwords do not match.");
        }
        if(errorStateCheck === ""){
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
    function handleChangePasswordVerify(){
        setErrorStatePasswordVerify("");
    }
    function handleChangeEmail(){
        setErrorStateEmail("");
    }
    function handleChangeCheck(){
        setErrorStateCheck("");
    }

    function handleSubmit (first, last, password, passwordVerify, email){
        checkBadCharacters(first, last, email);
        if(errorStateFirst === "" && errorStateLast === "" && errorStateEmail === "" && errorStatePassword === "" && errorStatePasswordVerify === "" && errorStateCheck === false){
            console.log("Successful submission");
            setFirst(first);
            setLast(last);
            setPassword(password);
            setPasswordVerify(passwordVerify);
            setEmail(email);
        }
        else {
            //console.log("Unsuccessful submission");
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
                                    <Grid.Column width={6} className={'firstCol'}>
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
                                                    <Divider />
                                                    <List bulleted size='mini'>
                                                        <List.Item>8 or more characters</List.Item>
                                                        <List.Item>At least one number</List.Item>
                                                        <List.Item>At least one lower-case letter</List.Item>
                                                        <List.Item>At least one upper-case letter</List.Item>
                                                    </List>
                                                        <Form.Field
                                                            control={Input}
                                                            label='Password'
                                                            placeholder='John'
                                                            error = {errorStatePassword !== "" ? errorStatePassword : false}
                                                            onChange = {handleChangePassword}
                                                        />
                                                        <Form.Field
                                                            control={Input}
                                                            label='Verify Password'
                                                            placeholder='Doe'
                                                            error = {errorStatePasswordVerify !== "" ? errorStatePasswordVerify : false}
                                                            onChange = {handleChangePasswordVerify}
                                                        />
                                                    <Form.Field
                                                        control={Input}
                                                        label='Email'
                                                        placeholder='allygator@fakeemail.com'
                                                        error = {errorStateEmail !== "" ? errorStateEmail : false}
                                                        onChange={handleChangeEmail}
                                                    />
                                                    <Form.Checkbox label='I agree to the Terms and Conditions of An Animated Discovery of Neuroscience' onChange = {handleChangeCheck}
                                                                   error = {errorStateCheck !== "" ? errorStateCheck : false}
                                                                   onClick = {handleChangeCheck}
                                                    />
                                                    <Form.Button content='Submit' />
                                                </Form>
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                    <Grid.Column width={6} className={'firstCol'}>
                                        <Card fluid>
                                           Benefits
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

export default RegisterPage;