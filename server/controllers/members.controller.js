const mongoose = require ('mongoose'),
    Member = require('../models/member.model'),
    util  = require('util'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    validateRegister = require('../validation/register'),
    validateLogin = require('../validation/login'),
    email = require('./email.controller');

//List all the information of a member in the database (GET)

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

//List a member's information (GET)
exports.read = (req, res) => {
    res.status(200);
    res.json(req.member);
};

//List a member's animation completion progress (GET)
exports.getAnimationProgress = (req, res) => {
    res.status(200);
    res.json(req.member);
};







