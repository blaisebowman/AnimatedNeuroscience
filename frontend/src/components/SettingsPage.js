import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {Grid, Image, Segment, Button, Card, Icon, Divider, List, Menu, Message, Modal} from "semantic-ui-react"

import '../neurons.css';
import '../glias.css';
import '../modal.css';
function SettingsPage(props) {
    const [progress, setProgress] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [updateEmail, setUpdateEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailConfirmError, setEmailConfirmError] = useState("");
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [deleteAccountConfirm, setDeleteAccountConfirm] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [redirectingToHome, setRedirectingToHome] = useState(false);
    const [currentTab, setCurrentTab] = useState("progress");
    const [completedAnimations, setCompletedAnimations] = useState([]);

    function handleProgress(){
        //load progress on default, as it takes up a bunch of whitespace.
        //shows member progress
        setCurrentTab("progress");
    }
    function handlePassword(){
        setCurrentTab("password");
        //allows member to update password
    }
    function handleEmail(){
        setCurrentTab("email");
        //allows member to update email
    }
    function handleDelete(){
        setCurrentTab("delete");
        //allows member to delete account
        //make sure to remove ID from session storage, then redirect to home page.
    }
    function cancelDeletion(){
        setModalVisible(false);
    }
    function processDeletion(){

    }
    function handleAnimations(){
        let id = ""; //get id from backend -> upon a valid login or registration, user is directed to this page.
        if(sessionStorage.getItem("memberLoggedIn")){
            id = sessionStorage.getItem("id");
        }
        //get a member's animation completion from the backend, convert into a list
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
                                        <Menu.Item name = 'progress' onClick = {handleProgress}>
                                           View My Progress
                                        </Menu.Item>
                                        <Menu.Item name = 'update' onClick = {handleEmail}>
                                            Update My Email
                                        </Menu.Item>
                                        <Menu.Item name = 'update' onClick = {handlePassword}>
                                            Update My Password
                                        </Menu.Item>
                                        <Menu.Item name = 'delete' onClick = {handleDelete}>
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
                                                <Card.Content>
                                                   Update my Email
                                                </Card.Content>

                                            </Card>
                                            }
                                            {currentTab === "password" &&
                                            <Card fluid>
                                                <Card.Content>
                                                    Update my Password
                                                </Card.Content>
                                            </Card>
                                            }
                                            {currentTab === "delete" &&
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