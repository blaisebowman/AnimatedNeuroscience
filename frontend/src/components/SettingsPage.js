import React, {useState} from 'react';
import {Link, Redirect, useHistory} from "react-router-dom";
import {
    Grid,
    Segment,
    Button,
    Card,
    Icon,
    Divider,
    List,
    Menu,
    Message,
    Modal,
    Form,
    Input
} from "semantic-ui-react"

import '../neurons.css';
import '../glias.css';
import '../modal.css';

function SettingsPage(props) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}/;
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailConfirmError, setEmailConfirmError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [redirectingToHome, setRedirectingToHome] = useState(false);
    const [currentTab, setCurrentTab] = useState("progress");
    const [completedAnimations, setCompletedAnimations] = useState([]);

    function changeTabs(){
        //ensure errors and values are set to default values on changes in the menu selection
        setPassword("");
        setPasswordConfirm("");
        setPassword("");
        setPasswordError("");
        setPasswordConfirmError("");
        setEmail("");
        setEmailConfirm("");
        setEmailError("");
        setEmailConfirmError("");
    }

    function checkBadCharacters (value1, value2, type){
        //ensure emails and passwords match regex
        if(type === "email"){
            if(!(emailRegex.test(value1))){
                setEmailError("Please enter a valid email address.");
            }
            if(!(emailRegex.test(value2))){
                setEmailConfirmError("Please enter a valid email address.");
            }
            else if(value1 !== value2){
                setEmailError("Emails do not match.");
                setEmailConfirmError("Emails do not match.");
            }
        }
        else {
            if(!(passwordRegex.test(value1))){
                setPasswordError("Please enter a valid password.");
            }
            if(!(passwordRegex.test(value2))){
                setPasswordConfirmError("Please enter a valid password.");
            }
            else if(value1 !== value2){
                setPasswordError("Passwords do not match.");
                setPasswordConfirmError("Passwords do not match.");
            }
        }
    }

    function handleProgress(){
        //upon a valid login or registration, user is directed to this page
        //load progress on default, as it takes up a bunch of whitespace.
        //shows member progress
        setCurrentTab("progress");
        changeTabs();
        let id = ""; //get id from backend.
        if(sessionStorage.getItem("memberLoggedIn")){
            id = sessionStorage.getItem("id");
        }
        setCompletedAnimations([]); //replace with the backend's data on a user
        //get a member's animation completion from the backend, convert into a list

    }
    function handlePassword(){
        //allows member to update password
        setCurrentTab("password");
        changeTabs();
    }

    function handleChangePassword(e, {name, value}){
        //keep track of value of password as user types
        setPasswordError("");
        setPassword(value);
    }
    function handleChangePasswordConfirm(e, {name, value}){
        //keep track of value of password confirm as user types
        setPasswordConfirmError("");
        setPasswordConfirm(value);
    }

    function handlePasswordSubmit() {
        //called on submit on the update password menu option
        checkBadCharacters(password, passwordConfirm, "password");
        if(passwordError.length === 0 && passwordConfirmError.length === 0){
            console.log("Password Updated");
        }
        else {
            console.log("Password NOT updated.");
        }
    }

    function handleEmail(){
        //switch to email tab
        setCurrentTab("email");
        changeTabs();
        //GET EMAIL FROM BACKEND -> TO-DO
        let storedEmail = "examplemail19@gmail.com"
        setCurrentEmail("Your current email is: " + storedEmail);
    }

    function handleChangeEmail(e, {name, value}){
        //keep track of email as user types
        setEmailError("");
        setEmail(value);
    }
    function handleChangeEmailConfirm(e, {name, value}){
        //keep track of email confirmation as user types
        setEmailConfirmError("");
        setEmailConfirm(value);
    }

    function handleEmailSubmit() {
        //called on submit in email update menu option
        checkBadCharacters(email, emailConfirm, "email");
        if(emailError.length === 0 && emailConfirmError.length === 0){
            console.log("Email Updated");
        }
        else {
            console.log("Email NOT updated.");
        }
    }

    function handleDelete(){
        setCurrentTab("delete");
        changeTabs();
    }

    function cancelDeletion(){
        setModalVisible(false);
    }

    function processDeletion(){
        //remove user associated with current ID from the database, and remove from session storage, redirect to home page.
        setRedirectingToHome(true);

    }

    return (
        <div className="App">
            <Segment className="body">
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid rows ={3}>
                                    <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Card fluid>
                                            <Card.Description>Welcome!</Card.Description>
                                        </Card>
                                    </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={3}>
                                        <Grid.Column width={3}>
                                    <Menu vertical fluid>
                                        <Menu.Item name ='msg'>
                                            Account Settings
                                        </Menu.Item>
                                        <Menu.Item name= 'progress' onClick = {handleProgress}>
                                            <Icon name= 'trophy'/>
                                            View My Progress
                                        </Menu.Item>
                                        <Menu.Item name = 'update' onClick = {handleEmail}>
                                            <Icon name= 'mail'/>
                                            Update My Email
                                        </Menu.Item>
                                        <Menu.Item name = 'update' onClick = {handlePassword}>
                                            <Icon name= 'lock'/>
                                            Update My Password
                                        </Menu.Item>
                                        <Menu.Item name = 'delete' onClick = {handleDelete}>
                                            <Icon name= 'user delete'/>
                                            Delete My Account
                                        </Menu.Item>
                                    </Menu>
                                        </Grid.Column>
                                        <Grid.Column width={13}>
                                            {currentTab === "progress" &&
                                            <Card fluid>
                                                <Card.Content>
                                                    Monitor your Progress!
                                                </Card.Content>
                                                <Card.Content>
                                                    Completed Animations
                                                </Card.Content>
                                                <Card.Content>
                                                    Remaining Animations
                                                </Card.Content>
                                            </Card>
                                            }
                                            {currentTab === "email" &&
                                            <Card fluid>
                                                <Card.Header className='myCardHeader'>
                                                   Update my Email
                                                </Card.Header>
                                                <Card.Content>
                                                <Form onSubmit={handleEmailSubmit}>
                                                    <Message content={currentEmail}/>
                                                    <Form.Group widths='equal'>
                                                        <Form.Field
                                                            control={Input}
                                                            label='Email'
                                                            placeholder=''
                                                            name='email'
                                                            value={email}
                                                            error={emailError !== "" ? emailError : false}
                                                            onChange={handleChangeEmail}
                                                        />
                                                        <Form.Field
                                                            control={Input}
                                                            label='Confirm Email'
                                                            placeholder=''
                                                            name='emailConfirm'
                                                            value={emailConfirm}
                                                            error={emailConfirmError !== "" ? emailConfirmError : false}
                                                            onChange={handleChangeEmailConfirm}
                                                        />
                                                    </Form.Group>
                                                    <Form.Button content='Submit' color='blue'/>
                                                </Form>
                                                </Card.Content>
                                            </Card>
                                            }
                                            {currentTab === "password" &&
                                            <Card fluid>
                                                <Card.Content>
                                                    Update my Password
                                                    <Form onSubmit={handlePasswordSubmit}>
                                                        <Message content='Password must be between
                                                            8-20 characters and contain at least one number, one
                                                            upper-case letter, and one lower-case letter. '/>
                                                        <Form.Group widths='equal'>
                                                            <Form.Field
                                                                control={Input}
                                                                label='Password'
                                                                placeholder=''
                                                                name='password'
                                                                value={password}
                                                                error={passwordError !== "" ? passwordError : false}
                                                                onChange={handleChangePassword}
                                                            />
                                                            <Form.Field
                                                                control={Input}
                                                                label='Confirm Email'
                                                                placeholder=''
                                                                name='passwordConfirm'
                                                                value={passwordConfirm}
                                                                error={passwordConfirmError !== "" ? passwordConfirmError : false}
                                                                onChange={handleChangePasswordConfirm}
                                                            />
                                                        </Form.Group>
                                                        <Form.Button content='Submit' color='blue'/>
                                                    </Form>
                                                </Card.Content>
                                            </Card>
                                            }
                                            {currentTab === "delete" &&
                                                <Card fluid>
                                                    <Card.Content>
                                                        <Message content='Are you sure you want to delete your account? You will lose all of your progress.'/>
                                                <Modal
                                                    onClose={()=> setModalVisible(false)}
                                                    onOpen={()=> setModalVisible(true)}
                                                    open={modalVisible}
                                                    trigger={<Button>Delete My Account</Button>}
                                                >
                                                    <Modal.Header styles={{textAlign: "middle"}} className='myModalHeader'>Are you sure you want to delete your account?</Modal.Header>
                                                    <Modal.Actions className='myModalActions'>
                                                        <Button
                                                                content='No, I want to keep my account.'
                                                                labelPosition='right'
                                                                icon='cancel'
                                                                onClick={cancelDeletion}
                                                                negative
                                                        />
                                                        <Button
                                                            content='Yes, delete my account.'
                                                            labelPosition='right'
                                                            icon='checkmark'
                                                            onClick={processDeletion}
                                                            positive
                                                        />
                                                    </Modal.Actions>
                                                </Modal>
                                                    </Card.Content>
                                                </Card>
                                            /*<Card fluid>
                                                <Card fluid color='red'>
                                                    <Message> WARNING: if you delete your account, you will lose all progress.</Message>
                                                </Card>
                                                <Card.Content>
                                                    Delete my Account
                                                </Card.Content>
                                                <Card.Content color='red'>
                                                    WARNING: if you delete your account, you will lose all progress.
                                                </Card.Content>


                                                <Card.Content>
                                                    Remaining Animations
                                                </Card.Content>
                                            </Card>*/
                                            }
                                            {redirectingToHome &&
                                            <Redirect to={'/introduction'}/>
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
            </Segment>
        </div>
    );
}

export default SettingsPage;