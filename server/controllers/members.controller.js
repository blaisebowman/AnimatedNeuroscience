const mongoose = require ('mongoose'),
    Member = require('../models/member.model'),
    util  = require('util'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    validateRegister = require('../validation/register'),
    validateLogin = require('../validation/login'),
    validateUpdate = require('../validation/update'),
    email = require('./email.controller');

//List all the information of a member in the database (GET)

if(process.env.NODE_ENV === 'production'){
    console.log("In production mode. Disable log statements -> hide log statements from console.");
    console.log = function (){};
}

exports.test = (req, res) => {
    console.log("Testing GET");
    res.status(200);
    res.json("TESTING...TESTING...123S");
    console.log("Test GET request posted successfully.");
}

//List information of all members in the database (GET)
exports.list = (req, res) => {
    Member.find({}, (error, member) => {
        if(error){
            res.status(400).send(error);
        }
        else {
            res.status(200);
            res.json(member);
        }
    }).lean();
};

//List (and sort) members by the number of animations they have completed (descending order)
exports.filterMembers = (req, res) => {
res.json(200);
res.json("Testing Filter Members");
};

//List a member's information (GET)
exports.read = (req, res) => {
    res.status(200);
    res.json(req.body);
};

//Update a member's login credentials (PUT)
exports.update = (req, res) => {
    const {updateError, updateValid} = validateUpdate(req.body);
    if(!updateValid){
        //ensure all formats are proper before checking for changes
        console.log(updateError);
        return res.status(400).json(updateError);
    }
    else {
        //member_first, member_last, member_email can all stay the same, if needed ....(for now).
        const member_first = req.body.member_first;
        const member_last = req.body.member_last;
        const member_email = req.body.member_email;
        const member_password = req.body.member_password;
        Member.findOne({member_email: req.body.member_email},(error, member) => {
            if(error){
                return res.status(400).send(error); // no member found in the database
            }
            else {
                console.log(member);
                if(member === null){
                    res.status(400);
                    return res.json({updatedInformationError: "There was an error updating your information: double-check your email and password."});
                }
                else {
                    console.log("Validating member password.");
                    bcrypt.compare(member_password, member.member_password).then(passwordValidate => {
                        if(passwordValidate){
                            //password is the same, prompt that password needs to change.
                            res.status(400);
                            console.log("New password equals old password");
                            return res.json({updateMemberInformationError: "Your new password must be different from your current password."})
                        }
                        else {
                            bcrypt.genSalt(10, (error, salt) => {
                                bcrypt.hash(member.member_password, salt, (error, hash) => {
                                    //store hash in password database
                                    if(error){
                                        throw error;
                                    }
                                    else {
                                        member.member_first = member_first;
                                        member.member_last = member_last;
                                        member.member_email = member_email;
                                        member.member_password = hash;
                                        member.account_change = new Date(); //keep track of date and time member changes login credentials
                                        member.save((error => {
                                            if(error){
                                                console.log(error);
                                                res.status(400).send(error);
                                            }
                                            else {
                                                console.log("Successfully updated member's credentials.");
                                                return res.json(member);
                                            }
                                        }));
                                    }
                                });
                            });
                        }
                    });
                }
            }
        });
    }
};

exports.updateName = (req, res) => {

};

//Delete a member's account (DELETE)
exports.delete = (req, res) => {
    res.status(200);
    res.json("Testing user delete");
}

exports.findMemberById = (req, res, next, id) => {
    //find a member by their member ID.
    Member.findById(id).exec((error, member) => {
        console.log(member);
        if (error) {
            res.status(400);
            res.json({memberWithId: 'A member with that ID does not exist in the database.'});
        } else {
            req.member = member;
            next();
            console.log("A member was found in database with the given ID.");
        }
    });
}

//List a member's animation data (GET)
exports.getAnimationProgress = (req, res) => {
    //to test in Postman: GET HTTP://localhost:8080/api/members/<memberId>/animations
    res.status(200);
    res.json(req.member.animation_data);
};
//List a member's animation completion progress (GET)
exports.getAnimationCompletion = (req, res) => {
    //to test in Postman: GET HTTP://localhost:8080/api/members/<memberId>/animations/completed
    res.status(200);
    res.json(req.member.animation_data.completed_animations);
};
//List a member's suggested animations (GET)
exports.getAnimationSuggested = (req, res) => {
    //to test in Postman: GET HTTP://localhost:8080/api/members/<memberId>/animations/suggested
    res.status(200);
    res.json(req.member.animation_data.suggested_animations);
};

//Update a member's completed animations
exports.updateAnimationCompletion = (req, res) => {

}
//Update a member's suggested animations
exports.updateAnimationCompletion = (req, res) => {

}

exports.register = (req, res) => {
    /*
    To test in Postman: http://localhost:8080/api/members/register
    {
    "member_role: "member",
    "member_email": "xxxxxxx",
    "member_password": "yyyyyy"
    }
     */
    const {registrationError, registrationValid} = validateRegister(req.body);
    if(!registrationValid){
        console.log(registrationError);
        //return res.status(400).json(registrationError);
        return res.status(400).json({formattingError: registrationError});
    }
    else {
        const memberEmail = req.body.member_email;
        Member.findOne({member_email: memberEmail}, (error, member) => {
            if(error){
                //Member is already registered (prompt user and redirect to login page on frontend);
                return res.status(400).send(error);
            }
            else {
                // No member is the database is associated with the registration email (new user)
                if(member === null){
                    console.log("Registering a new member");
                    const newMember = new Member({
                        member_first: req.body.member_first,
                        member_last: req.body.member_last,
                        member_role: "member",
                        member_email: req.body.member_email,
                        member_password: req.body.member_password
                    });
                    bcrypt.genSalt(10, (error, salt) => {
                        bcrypt.hash(newMember.member_password, salt, (error, hash) => {
                           //store hash in password database
                            if(error){
                                throw error;
                            }
                            else {
                                newMember.member_password = hash;
                                newMember.save()
                                    .then((member)=> {
                                        const id = member._id;
                                        //email.send(id, memberEmail);
                                        return res.json(id);
                                    })
                                    .catch((error) => {
                                       console.log(error);
                                       return res.status(400).send(error);
                                    });
                            }
                        });
                    });
                } else {
                    //member !== null
                    return res.status(400).json({userExists: "Email is already registered to another user."});
                }
            }
        })
    }
}

exports.login = (req, res) => {
    /*
    To test in Postman: http://localhost:8080/api/login
    {
    "member_email": "xxxxxxx",
    "member_password": "yyyyyy"
    }
     */
    const {loginError, loginValid} = validateLogin(req.body);
    if (!loginValid){
        console.log(loginError);
        return res.status(400).json(loginError);
    }
    else {
        const memberEmail = req.body.member_email;
        const memberPassword = req.body.member_password;
        Member.findOne({member_email: req.body.member_email},(error, member) => {
            if(error){
                return res.status(400).send(error);
            }
            else {
                if(member === null){
                    res.status(400);
                    return res.json({loginEmailError: "We can't find an account associated with that email. Please double-check your email address."});
                }
                else {
                    //memberPassword -> plain text password
                    //member.member_password -> hashed password associated with member in database
                    console.log(memberPassword);
                    console.log(member);
                    console.log(member.member_password)
                    console.log("Validating member password.");
                    bcrypt.compare(memberPassword, member.member_password).then(passwordValidate => {
                      if(passwordValidate){
                          console.log("Member Login Dates: " + member.login_dates);
                          member.login_dates.push(new Date().toISOString());//keep track of date and time member logs in
                          member.save((error => {
                              if(error){
                                  console.log(error);
                                  res.status(400).send(error);
                              }
                              else {
                                  const id = member.id;
                                  //email.send(id, memberEmail);
                                  return res.json(id);
                              }
                          }));

                      }
                      else {
                          res.status(400);
                          return res.json({loginPasswordError: "Your password is incorrect. Please double-check your password."});
                        }
                    });
                }
            }
        });
    }
}







