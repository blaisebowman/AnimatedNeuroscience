const validator = require('validator'),
    isEmpty = require('is-empty');

module.exports = function validateLogin(arguments){
    let loginErrors = {}; //initialize login errors object
    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //*Email entry
    arguments.member_email = !isEmpty(arguments.member_email) ? arguments.member_email : "";
    //*Password entry
    arguments.member_password = !isEmpty(arguments.member_password) ? arguments.member_password : "";

    if(isEmpty(arguments.member_email)){
        loginErrors.email = "Error: email address field is empty.";
    } else if (!(emailRegex.test(arguments.member_email))){
        loginErrors.email = "Error: email address is in an invalid format.";
    }
    if(isEmpty(arguments.member_password)){
        loginErrors.password = "Error: password field is empty.";
    }
    if(process.env.NODE_ENV === 'production'){
        console.log = function (){};
    }
    console.log(loginErrors);
    console.log(isEmpty(loginErrors));
    return {
        loginErrors,
        loginValid: isEmpty(loginErrors)
    };
};