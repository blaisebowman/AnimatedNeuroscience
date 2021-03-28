const validator = require('validator'),
    isEmpty = require('is-empty');

module.exports = function validateUpdate(arguments){
    let updateErrors = {}; //initialize login errors object
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}/; //at least 8 characters, maximum of 20 characters. At least one upper-case letter, one lower-case letter, and at least one integer.
    arguments.member_id = !isEmpty(arguments.member_id) ? arguments.member_id: "";
    //*Email entry
    arguments.member_email = !isEmpty(arguments.member_email) ? arguments.member_email : "";
    //*Password entry
    arguments.member_password = !isEmpty(arguments.member_password) ? arguments.member_password : "";
    //*Password confirmation entry
    arguments.member_password_confirm = !isEmpty(arguments.member_password_confirm) ? arguments.member_password_confirm : "";
    //*Which field to update (email or password)
    arguments.type

    /*if(isEmpty(arguments.member_first)){
        updateErrors.first = "Error: please enter your first name";
    }
    else if (!(nameRegex.test(arguments.member_first))){
        updateErrors.first = "Error: please enter a valid first name";
    }

    if(isEmpty(arguments.member_last)){
        updateErrors.last = "Error: please enter your last name";
    }

    else if (!(nameRegex.test(arguments.member_last))){
        updateErrors.first = "Error: please enter a valid last name";
    }*/

    if (arguments.type === "email") {
        if (isEmpty(arguments.member_email)) {
            updateErrors.email = "Error: email address field is empty.";
        }
        else if (arguments.member_email.length < 3) {
            updateErrors.email = "Error: the email you entered is not a valid email address.";
        }
        else if (!(emailRegex.test(arguments.member_email))) {
            updateErrors.email = "Error: the email you entered is not a valid email address.";
        }
    }
    else if (arguments.type === "password") {
        if (arguments.member_password !== arguments.member_password_confirm){
            updateErrors.password = "Error: the passwords you entered do not match."
        }
        else if(isEmpty(arguments.member_password)){
            updateErrors.password = "Error: password field is empty.";
        }
        else if(isEmpty(arguments.member_password_confirm)){
            updateErrors.password = "Error: password confirmation field is empty.";
        }
        else if (!((passwordRegex.test(arguments.member_password)))) {
            //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$
            updateErrors.password = "Error: passwords must match the given format.";
        }
        else if (!((passwordRegex.test(arguments.member_password_confirm)))) {
            //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$
            updateErrors.password_confirm = "Error: passwords must match the given format.";
        }
    }
    console.log(updateErrors);
    console.log(isEmpty(updateErrors));
    return {
        updateErrors,
        updateValid: isEmpty(updateErrors)
    };
};