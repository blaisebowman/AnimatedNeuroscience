const mongoose = require ('mongoose'),
    Member = require('../models/member.model.js'),
    util  = require('util'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    validateRegister = require('../validation/register'),
    validateLogin = require('../validation/login'),
    email = require('./email.controller');

//List all the information of a member in the database (GET)

exports.test = (req, res) => {
    console.log("Testing GET");
    res.status(200);
    res.json("TESTING...TESTING...123S");
    console.log("Test GET request posted successfully.");
}

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
    res.json(req);
};

exports.update = (req, res) => {
    res.status(200);
    res.json("Testing user update");
};

exports.delete = (req, res) => {
    res.status(200);
    res.json("Testing user delete");
}

//List a member's animation completion progress (GET)
exports.getAnimationProgress = (req, res) => {
    res.status(200);
    //res.json(req.member);
    res.json("Testing get animation progress.");
};

exports.register = (req, res) => {
    const {registrationError, registrationValid} = validateRegister(req.body);
    if(!registrationValid){
        return res.status(400).json(registrationError);
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
                        member_email: req.body.member_email,
                        member_password: req.body.member_password,
                        member_role: "member"
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
                                        const id = member.id;
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
                }
                else if(member !== null){
                    return res.status(400).json({userExists: "Email is already registered to another user."});
                }
            }
        })
    }
}

exports.login = (req, res) => {
    const {loginError, loginValid} = validateLogin(req.body);
}







