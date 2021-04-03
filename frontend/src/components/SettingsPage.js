import React, {useState, useEffect} from 'react';
import {Link, Redirect, useHistory} from "react-router-dom";
import {Grid, Segment, Button, Card, Icon, Divider, List, Menu, Message, Modal, Form, Input, Dropdown, Table } from "semantic-ui-react"
import {CustomMenuItem, CustomProgressHeader, CustomProgressMenu, CustomProgressDropdown} from "../styledComponents";
import '../neurons.css';
import '../glias.css';
import '../modal.css';
import axios from "axios";

function SettingsPage(props) {
    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}/;
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState("");
    const [passwordUpdateError, setPasswordUpdateError] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailConfirmError, setEmailConfirmError] = useState("");
    const [emailUpdateSuccess, setEmailUpdateSuccess] = useState("");
    const [emailUpdateError, setEmailUpdateError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [redirectingToHome, setRedirectingToHome] = useState(false);
    const [currentTab, setCurrentTab] = useState("progress");
    const [completedAnimations, setCompletedAnimations] = useState([]);
    const [capsLockPassword, setCapsLockPassword] = useState(false);
    const [capsLockPasswordConfirm, setCapsLockPasswordConfirm] = useState(false);
    const [currentInputForm, setCurrentInputForm] = useState("");
    const [isCaps, setIsCaps] = useState(false);
    const [isMasked, setIsMasked] = useState("password");
    const [options, setOptions] = useState([
        {key: 1, text: 'Number Completed (High - Low)', value: 'Number Completed (High - Low)'},
        {key: 2, text: 'Number Completed (Low - High)', value: 'Number Completed (Low - High'},
        {key: 3, text: 'Time Remaining (High-Low)', value: 'Time Remaining (High-Low)'},
        {key: 4, text: 'Time Remaining (Low-High)', value: 'Time Remaining (Low-High)'}
        ]);
    const [dropdownOption, setDropdownOption] = useState("Number Completed (High - Low)");
    const [animationsInfo, setAnimationsInfo] = useState([
        {name: "", complete: "", remaining: "", percentage: "", time: ""},
        {name: "", complete: "", remaining: "", percentage: "", time: ""},
        {name: "", complete: "", remaining: "", percentage: "", time: ""},
        {name: "", complete: "", remaining: "", percentage: "", time: ""},
        {name: "", complete: "", remaining: "", percentage: "", time: ""},
        {name: "", complete: "", remaining: "", percentage: "", time: ""},
    ]);

    if(process.env.NODE_ENV === 'production'){
        console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function (){};
    }

    useEffect(()=>{
        //TODO
        //run only on change to Animation Progress
        if(currentTab === "progress"){
            //Axios GET request (getAnimationsSorted) to return the array of animation objects determined in the backend
            //setAnimationsInfo(PLACEHOLDER);
        }
        }, [currentTab]);

    function changeTabs() {
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
        setPasswordUpdateError("");
        setPasswordUpdateSuccess("");
        setEmailUpdateError("");
        setEmailUpdateSuccess("");
    }

    useEffect(()=> {
        //TODO -> Mobile Caps Lock Detection (iOS, Android)
        const handleCapsLock = (e) => {
            const deviceIsMac = /Mac/.test(navigator.platform);
            if (deviceIsMac && e.keyCode === 57) {
                if(isCaps === false){
                    console.log("Mac user enabled caps lock");
                    setIsCaps(true);
                }
                else {
                    console.log("Mac user disabled caps lock");
                    setIsCaps(false);
                    setCapsLockPassword(false);
                    setCapsLockPasswordConfirm(false);
                }
            } else if (!(deviceIsMac) && e.keyCode === 20) {
                if(isCaps === false){
                    console.log("Windows user enabled caps lock");
                    setIsCaps(true);
                }
                else {
                    console.log("Windows user disabled caps lock");
                    setIsCaps(false);
                    setCapsLockPassword(false);
                    setCapsLockPasswordConfirm(false);
                }
            }
        };
        window.addEventListener('keydown', handleCapsLock);
        return () => {
            window.removeEventListener('keydown', handleCapsLock);
        };
    }, [isCaps]);

    function checkCapsLock(e){
        const deviceIsMac = /Mac/.test(navigator.platform);
        console.log(e.target.name);
        console.log(e._reactName);
        console.log(e.keyCode);
        //e.target.name = "password" || e.target.name = "passwordConfirm
        //change all email based vars to passwordConfirm
        if((e._reactName === "onClick") && (currentInputForm !== e.target.name)){
            console.log(currentInputForm);
            console.log(isCaps);
            if(e.target.name === "password" && isCaps){
                setCapsLockPassword(true);
                setCapsLockPasswordConfirm(true);
            }
            else if(e.target.name === "passwordConfirm" && capsLockPassword === true){
                setCapsLockPasswordConfirm(true)
                setCapsLockPassword(false);
            }
            else if (e.target.name === "password" && capsLockPasswordConfirm === true){
                setCapsLockPasswordConfirm(false);
                setCapsLockPassword(true);
            }
            setCurrentInputForm(e.target.name);
        }
        else if (((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === false){
            if(e.target.name === "passwordConfirm"){
                if(capsLockPasswordConfirm === true){
                    return;
                }
                else if (capsLockPassword === true){
                    setCapsLockPassword(false);
                }
                else {
                    setCapsLockPasswordConfirm(true);
                }
            }
            else if (e.target.name === "password"){
                if(capsLockPassword === true){
                    return;
                }
                else if (capsLockPasswordConfirm === true){
                    setCapsLockPasswordConfirm(false);
                }
                else {
                    setCapsLockPassword(true);
                }
            }
            setIsCaps(true);
        }
        else if(((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === true){
            setCapsLockPasswordConfirm(false);
            setCapsLockPassword(false);
            setIsCaps(false);
        }
    }

    function checkBadCharacters(value1, value2, type) {
        //ensure emails and passwords match regex
        if (type === "email") {
            if (!(emailRegex.test(value1))) {
                setEmailError("Please enter a valid email address.");
            }
            if (!(emailRegex.test(value2))) {
                setEmailConfirmError("Please enter a valid email address.");
            } else if (value1 !== value2) {
                setEmailError("Emails do not match.");
                setEmailConfirmError("Emails do not match.");
            }
        } else {
            if (!(passwordRegex.test(value1))) {
                setPasswordError("Please enter a valid password.");
            }
            if (!(passwordRegex.test(value2))) {
                setPasswordConfirmError("Please enter a valid password.");
            } else if (value1 !== value2) {
                setPasswordError("Passwords do not match.");
                setPasswordConfirmError("Passwords do not match.");
            }
        }
    }

    function handleProgress() {
        //upon a valid login or registration, user is directed to this page
        //load progress on default, as it takes up a bunch of whitespace.
        //shows member progress
        setCurrentTab("progress");
        changeTabs();
        let id = ""; //get id from backend.
        if (sessionStorage.getItem("memberLoggedIn")) {
            id = sessionStorage.getItem("id");
        }
        setCompletedAnimations([]); //replace with the backend's data on a user
    }

    function handlePassword() {
        //allows member to update password
        setCurrentTab("password");
        changeTabs();
    }

    function handleChangePassword(e, {name, value}) {
        //keep track of value of password as user types
        setPasswordError("");
        setPassword(value);
        setPasswordUpdateError("")
        setPasswordUpdateSuccess("");
    }

    function handleChangePasswordConfirm(e, {name, value}) {
        //keep track of value of password confirm as user types
        setPasswordConfirmError("");
        setPasswordConfirm(value);
        setPasswordError("");
        setPasswordUpdateSuccess("");
    }

    async function handlePasswordSubmit() {
        //called on submit on the update password menu option
        checkBadCharacters(password, passwordConfirm, "password");
        if (passwordError.length === 0 && passwordConfirmError.length === 0) {
            let id = sessionStorage.getItem("id");
            let port = process.env.PORT || 'http://localhost:8080/api/members/' + id;
            await axios.post(port, {
                _id: id,
                member_password: password,
                member_password_confirm: passwordConfirm,
                type: "password",
            }, {headers: {'Content-Type': 'application/json'}})
                .then(function(response) {
                    console.log("Password Updated");
                    console.log(response.data);
                    //setRedirect(true);
                    setPassword('');
                    setPasswordConfirm('');
                    setPasswordUpdateSuccess(true);
                }).catch(function(error) {
                    console.log("Password NOT updated");
                    console.log(error.response);
                    console.log(error.response.headers);
                    console.log(error.response.status);
                    console.log(error.response.data.updateMemberInformationError);
                    setPasswordUpdateError(error.response.data.updateMemberInformationError);
                });
        } else {
            console.log("Password NOT updated.");
        }
    }

    async function handleEmail() {
        //switch to email tab, returns a member's email from the database.
        setCurrentTab("email");
        changeTabs();
        let storedEmail = "";
        let id = sessionStorage.getItem("id");
        let port = process.env.PORT || ('http://localhost:8080/api/members/' + id + '/read');
        await axios.post(port, {
                _id: id,
                parameter: "email"
            }, {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                console.log(response.data);
                sessionStorage.setItem('reload', "true");
                //setEmail('');
                storedEmail = response.data;
            }).catch(function (error) {
                console.log(error);
                console.log(error.response);
                console.log(error.response.headers);
                console.log(error.response.status);
            });
        setCurrentEmail("Your current email is: " + storedEmail);
    }

    function handleChangeEmail(e, {name, value}) {
        //keep track of email as user types
        setEmailError("");
        setEmailConfirmError("");
        setEmail(value);
        setEmailUpdateError("");
        setEmailUpdateSuccess("");
    }

    function handleChangeEmailConfirm(e, {name, value}) {
        //keep track of email confirmation as user types
        setEmailError("");
        setEmailConfirmError("");
        setEmailConfirm(value);
        setEmailUpdateError("");
        setEmailUpdateSuccess("");
    }

    async function handleEmailSubmit() {
        //called on submit in email update menu option
        checkBadCharacters(email, emailConfirm, "email");
        console.log(emailError);
        console.log(emailConfirmError);
        if (emailError.length === 0 && emailConfirmError.length === 0) {
            console.log("Email Updated");
            let id = sessionStorage.getItem("id");
            let port = process.env.PORT || 'http://localhost:8080/api/members/'+id
            await axios.post(port, {
                _id: id,
                member_email: email,
                type: "email",
            }, {headers: {'Content-Type': 'application/json'}})
                .then(function(response) {
                    console.log(response.data);
                    //setRedirect(true);
                    sessionStorage.setItem('reload', "true");
                    //setEmail('');
                    setCurrentEmail(email);
                    setEmailUpdateSuccess(true);
                }).catch(function(error) {
                    console.log(error.response);
                    console.log("Email NOT updated.");
                    setEmailUpdateError(error.response.data.updateMemberInformationError);
                });
        } else {
            console.log("Email NOT updated.");
        }
    }

    function handleDelete() {
        setCurrentTab("delete");
        changeTabs();
    }

    function cancelDeletion() {
        setModalVisible(false);
    }

    async function processDeletion() {
        //remove user associated with current ID from the database, and remove from session storage, redirect to home page.
        console.log("Processing user deletion:");
        let id = sessionStorage.getItem("id");
        let port = process.env.PORT || ('http://localhost:8080/api/members/' + id);
        var axios = require('axios');
        var config = {
            method: 'delete',
            url: port,
            headers: {
                'Content-Type': 'application/json'
            },
            data : {
                _id: id
            }
        };
        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                sessionStorage.removeItem("id");
                sessionStorage.removeItem("memberLoggedIn");
                setRedirectingToHome(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleDropdownEnter (){
        //TODO
    }

    function handleDropdownLeave (){
        //TODO
    }

    function handleDropdownSelection (){
        //TODO
        //Axios get request with parameters passed
    }

    return (
        <div className="App">
            <Segment className="body">
                <div className="modGrid">
                    <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                        <Grid.Column width={16} className='noPadding'>
                            <Segment className="imgSeg">
                                <Grid rows={3}>
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
                                                <CustomMenuItem name='msg'>
                                                    Account Settings
                                                </CustomMenuItem>
                                                <Menu.Item name='progress' onClick={handleProgress}>
                                                    <Icon name='trophy'/>
                                                    View My Progress
                                                </Menu.Item>
                                                <Menu.Item name='update' onClick={handleEmail}>
                                                    <Icon name='mail'/>
                                                    Update My Email
                                                </Menu.Item>
                                                <Menu.Item name='update' onClick={handlePassword}>
                                                    <Icon name='lock'/>
                                                    Update My Password
                                                </Menu.Item>
                                                <Menu.Item name='delete' onClick={handleDelete}>
                                                    <Icon name='user delete'/>
                                                    Delete My Account
                                                </Menu.Item>
                                            </Menu>
                                        </Grid.Column>
                                        <Grid.Column width={13}>
                                            {currentTab === "progress" &&
                                                <CustomProgressMenu vertical fluid>
                                                    <CustomMenuItem>
                                                        Your Progress
                                                    </CustomMenuItem>

                                                    <Menu.Item>
                                                        <Message>
                                                            <Grid columns={2}>
                                                                <Grid.Column width={12} textAlign='left' verticalAlign='middle'>
                                                                    <CustomProgressHeader>
                                                                        Animation Completion By Category
                                                                    </CustomProgressHeader>
                                                                </Grid.Column>
                                                                <Grid.Column width={4} textAlign='middle' float='left'>
                                                                    <CustomProgressDropdown
                                                                        text='Sort By'
                                                                        onMouseEnter={handleDropdownEnter}
                                                                        onMouseLeave={handleDropdownLeave}
                                                                        onClick = {handleDropdownSelection}
                                                                        options ={options}
                                                                        placeholder='Sort By: '
                                                                        selection
                                                                        value ={dropdownOption}
                                                                    />
                                                                </Grid.Column>
                                                            </Grid>
                                                        </Message>
                                                        <Message>
                                                            <Table>
                                                                <Table.Header>
                                                                    <Table.Row>
                                                                        <Table.HeaderCell>Animation Category</Table.HeaderCell>
                                                                        <Table.HeaderCell>Number Completed</Table.HeaderCell>
                                                                        <Table.HeaderCell>Number Remaining</Table.HeaderCell>
                                                                        <Table.HeaderCell>Estimated Time</Table.HeaderCell>
                                                                    </Table.Row>
                                                                </Table.Header>
                                                                <Table.Body>
                                                                    <Table.Row>
                                                                    <Table.HeaderCell>{animationsInfo[0].name}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[0].complete}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[0].remaining}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[0].time}</Table.HeaderCell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                    <Table.HeaderCell>{animationsInfo[1].name}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[1].complete}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[1].remaining}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[1].time}</Table.HeaderCell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                    <Table.HeaderCell>{animationsInfo[2].name}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[2].complete}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[2].remaining}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[2].time}</Table.HeaderCell>
                                                                    </Table.Row> 
                                                                    <Table.Row>
                                                                    <Table.HeaderCell>{animationsInfo[3].name}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[3].complete}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[3].remaining}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[3].time}</Table.HeaderCell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                    <Table.HeaderCell>{animationsInfo[4].name}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[4].complete}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[4].remaining}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[4].time}</Table.HeaderCell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                    <Table.HeaderCell>{animationsInfo[5].name}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[5].complete}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[5].remaining}</Table.HeaderCell>
                                                                    <Table.HeaderCell>{animationsInfo[5].time}</Table.HeaderCell>
                                                                    </Table.Row>
                                                                </Table.Body>
                                                            </Table>
                                                        </Message>
                                                        <Dropdown>
                                                        </Dropdown>
                                                    </Menu.Item>
                                                </CustomProgressMenu>

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
                                                        {emailUpdateError &&
                                                        <Message content={emailUpdateError} color={'red'}/>
                                                        }
                                                        {emailUpdateSuccess &&
                                                        <Message content="Email Successfully Updated." color={'blue'}/>
                                                        }
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
                                                                type={isMasked}
                                                                control={Input}
                                                                label='Password'
                                                                placeholder=''
                                                                name='password'
                                                                value={password}
                                                                error={passwordError !== "" ? passwordError : false}
                                                                onChange={handleChangePassword}
                                                                onClick={checkCapsLock}
                                                                onKeyDown={checkCapsLock}
                                                            />
                                                            <Form.Field
                                                                type={isMasked}
                                                                control={Input}
                                                                label='Confirm Password'
                                                                placeholder=''
                                                                name='passwordConfirm'
                                                                value={passwordConfirm}
                                                                error={passwordConfirmError !== "" ? passwordConfirmError : false}
                                                                onChange={handleChangePasswordConfirm}
                                                                onClick={checkCapsLock}
                                                                onKeyDown={checkCapsLock}
                                                            />
                                                        </Form.Group>
                                                        {(capsLockPassword || capsLockPasswordConfirm) &&
                                                        <Message content='Warning: Caps Lock is enabled.' color='yellow'/>
                                                        }
                                                        {passwordUpdateError &&
                                                            <Message content={passwordUpdateError} color={'red'}/>
                                                        }
                                                        {passwordUpdateSuccess &&
                                                        <Message content={"Password Successfully Updated."} color={'blue'}/>
                                                        }
                                                        <Form.Button content='Submit' color='blue'/>
                                                    </Form>
                                                </Card.Content>
                                            </Card>
                                            }
                                            {currentTab === "delete" &&
                                            <Card fluid>
                                                <Card.Content>
                                                    <Message
                                                        content='Are you sure you want to delete your account? You will lose all of your progress.'/>
                                                    <Modal
                                                        onClose={() => setModalVisible(false)}
                                                        onOpen={() => setModalVisible(true)}
                                                        open={modalVisible}
                                                        trigger={<Button>Delete My Account</Button>}
                                                    >
                                                        <Modal.Header styles={{textAlign: "middle"}}
                                                                      className='myModalHeader'>Are you sure you want to
                                                            delete your account?</Modal.Header>
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