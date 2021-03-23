const isEmpty = require('is-empty');

module.exports = function validateRegister(arguments){
    let registerErrors = {}; //initialize register errors object
    //*First name
    arguments.member_first = !isEmpty(arguments.member_first) ? arguments.member_first : "";
    //*Last name
    arguments.member_last = !isEmpty(arguments.member_last) ? arguments.member_last : "";
    //*Email entry
    arguments.member_email = !isEmpty(arguments.member_email) ? arguments.member_email : "";
    //*Password entry
    arguments.member_password = !isEmpty(arguments.member_password) ? arguments.member_password : "";
    //*Password confirmation entry
    arguments.member_password_confirm = !isEmpty(arguments.member_password_confirm) ? arguments.member_password_confirm : "";

    if(validator.isEmpty(arguments.member_first)){
        registerErrors.first = "Error: please enter your first name";
    }
    else if (!(/^(?!-)(?!.*-$)[a-zA-Z-]+$/.test(arguments.member_first))){
        registerErrors.first = "Error: please enter a valid first name";
    }

    else if(validator.isEmpty(arguments.member_last)){
        registerErrors.last = "Error: please enter your last name";
    }

    else if (!(/^(?!-)(?!.*-$)[a-zA-Z-]+$/.test(arguments.member_last))){
        registerErrors.first = "Error: please enter a valid last name";
    }

    if(validator.isEmpty(arguments.member_email)){
        registerErrors.email = "Error: email address field is empty.";
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(arguments.member_email))){
        registerErrors.email = "Error: email address is in an invalid format.";
    }
    if(validator.isEmpty(arguments.member_password)){
        registerErrors.password = "Error: password field is empty.";
    }
    else if(validator.isEmpty(arguments.member_password_confirm)){
        registerErrors.password = "Error: password confirmation field is empty.";
    }
    else if(!((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(arguments.member_password_confirm)))){
        registerErrors.password = "Error: password must match the given format.";
    }
    else if(validator.isEmpty(arguments.member_password_confirm)){
        registerErrors.password = "Error: password confirmation field is empty.";
    }
    return {
        registerErrors,
        isValid: isEmpty(registerErrors)
    };
};