import React, {useState} from "react";
import {Button, Card, Divider, Grid, Header, Icon, Image, Segment, Form, Input} from "semantic-ui-react"
import {Link} from "react-router-dom";

function RegisterPage(props) {
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [errorStateFirst, setErrorStateFirst] = useState("");
    const [errorStateLast, setErrorStateLast] = useState("");
    const [errorStateEmail, setErrorStateEmail] = useState("");
    const [errorStatePassword, setErrorStatePassword] = useState("");
    const [errorStatePasswordVerify, setErrorStatePasswordVerify] = useState("");
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
    }

    function handleSubmit (first, last, email){
        checkBadCharacters(first, last, email);
        if(errorStateFirst === "" && errorStateLast === "" && errorStateEmail === "" && errorStatePassword === "" && errorStatePasswordVerify === ""){
            console.log("Successful submission");
        }
        //use switch statement
        //Case 1: FirstName=GOOD, LastName=GOOD, Email=GOOD
        //Case 2: Same email is already in use, show pop-up message, then re-direct to login
        //Case 3: FirstName=BAD, LastName=GOOD, Email=GOOD
        //Case 4: FirstName=BAD, LastName=BAD, Email=GOOD
        //Case 5: FirstName=BAD, LastName=BAD, Email=BAD
        //Case 6: FirstName=BAD, LastName=GOOD, Email=GOOD
        //Case 7: FirstName=BAD, LastName=GOOD, Email=BAD
        //Case 8: FirstName=GOOD, LastName=BAD, Email=GOOD
        //Case 9: FirstName=GOOD, LastName=BAD, Email=BAD
        //Case 10: FirstName=GOOD, LastName=GOOD, Email=BAD
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
                                                <Form>
                                                    <Form.Group widths='equal'>
                                                        <Form.Field
                                                            id='form-input-control-first-name'
                                                            control={Input}
                                                            label='First Name'
                                                            placeholder='John'
                                                        />
                                                        <Form.Field
                                                            id='form-input-control-last-name'
                                                            control={Input}
                                                            label='Last Name'
                                                            placeholder='Doe'
                                                        />
                                                    </Form.Group>
                                                    <Form.Field
                                                        id='form-input-control-error-email'
                                                        control={Input}
                                                        label='Email'
                                                        placeholder='allygator@fakeemail.com'
                                                        error={{content: 'Enter a valid email address',
                                                                pointing: 'below',
                                                        }}
                                                    />
                                                    <Form.Field>

                                                    </Form.Field>
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