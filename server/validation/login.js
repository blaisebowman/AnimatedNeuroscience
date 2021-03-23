const isEmpty = require('is-empty');

module.exports = function validateLogin(arguments){
    let loginErrors = {}; //initialize login errors object
    //*Email entry
    arguments.member_email = !isEmpty(arguments.member_email) ? arguments.member_email : "";
    //*Password entry
    arguments.member_password = !isEmpty(arguments.member_password) ? arguments.member_password : "";

    if(validator.isEmpty(arguments.member_email)){
        loginErrors.email = "Error: email address field is empty.";
    }
    else if (!(validator.isEmail(arguments.member_email))){
        loginErrors.email = "Error: email address is in an invalid format.";
    }
    if(validator.isEmpty(arguments.member_password)){
        loginErrors.password = "Error: password field is empty.";
    }
    return {
        loginErrors,
        isValid: isEmpty(loginErrors)
    };
};