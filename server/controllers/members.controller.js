const mongoose = require ('mongoose'),
    Member = require('../models/member.model'),
    Mailer = require('../email/emailSender'),
    bcrypt = require('bcryptjs'),
    validateRegister = require('../validation/register'),
    validateLogin = require('../validation/login'),
    validateUpdate = require('../validation/update');

if(process.env.NODE_ENV === 'production'){
    console.log("In production mode. Disable log statements -> hide log statements from console.");
    console.log = function (){};
} else {
    require('mongoose').set('debug', true);
}

//List information of all members in the database (GET)
exports.list = (req, res) => {
    Member.find({}, (error, member) => {
        if(error){
            res.status(400).send(error);
        }
        if(member.length === 0){
            console.log("No members in the database");
        }
        else {
            console.log(member);
            res.status(200);
            return res.json(member);
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
    console.log(req.parameters);
    console.log(req.body);
    const _id = req.body._id;
    const parameterNeeded = req.body.parameter;
    console.log(parameterNeeded);
    console.log(_id);
    Member.findOne({_id: _id},(error, member) => {
        if (error) {
            return res.status(400).send(error);
        } else {
                switch (parameterNeeded){
                    case "":
                        return res.status(200).json(member);
                    case "email":
                        return res.status(200).json(member.member_email);
                    case "firstName":
                        return res.status(200).json(member.first_name);
                    case "lastName":
                        return res.status(200).json(member.last_name);
                    case "role":
                        return res.status(200).json(member.member_role);
                    case "loginDates":
                        return res.status(200).json(member.member_email);
                    case "accountChange":
                        return res.status(200).json(member.accountChange);
                    case "emailChange":
                        return res.status(200).json(member.emailChange);
                    case "passwordChange":
                        return res.status(200).json(member.passwordChange);
                    case "animationData":
                        return res.status(200).json(member.animation_data);
                    case "completedAnimations":
                        return res.status(200).json(member.completed_animations);
                    case "suggestedAnimations":
                        return res.status(200).json(member.suggested_animations);
                    case "id":
                        return res.status(200).json(member._id);
                    default:
                        return res.status(400).json({error: "Unexpected error."});
                }
        }});
}

//UPDATE A MEMBER'S LOGIN CREDENTIALS
exports.update = (req, res) => {
    const {updateErrors, updateValid} = validateUpdate(req.body);
    if(!updateValid){
        //ensure all formats are proper before checking for changes
        return res.status(400).json({updateErrors:updateErrors});
    }
    else {
        //member_first, member_last, member_email can all stay the same, if needed ....(for now).
        console.log(req.body);
        const _id = req.body._id;
        const member_email = req.body.member_email;
        const member_password = req.body.member_password;
        const type = req.body.type;
        Member.findOne({_id: _id},(error, member) => {
            if(error){
                console.log(error);
                return res.status(400).json({updateMemberInformationError: error}); // no member found in the database
            }
            else {
                console.log(member._id);
                    console.log("Validating member password.");
                    if(type === "password") {
                        bcrypt.compare(member_password, member.member_password,(error, match)=>{
                            if(error){
                                console.log(error);
                                res.status(400).send(error);
                            }
                            else {
                                console.log("hit else");
                                console.log(match);
                                console.log(member_password);
                                console.log(member.member_password);
                                if (match) {
                                    //password is the same, prompt that password needs to change.
                                    console.log("New password equals old password");
                                    return res.status(400).json({updateMemberInformationError: "Your new password must be different from your current password."})
                                } else {
                                    bcrypt.genSalt(10, (error, salt) => {
                                        bcrypt.hash(member_password, salt, (error, hash) => {
                                            //store hash in password database
                                            if (error) {
                                                throw error;
                                            } else {
                                                member.member_password = hash;
                                                member.account_change.password_change.push(new Date().toISOString());
                                                member.save((error => {
                                                    if (error) {
                                                        console.log(error);
                                                        res.status(400).send(error);
                                                    } else {
                                                        console.log("Password successfully updated.");
                                                        return res.status(200).json(member);
                                                    }
                                                }));
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    }
                    else if(type === "email"){
                        console.log(member);
                        if(member_email === member.member_email){
                            res.status(400).json({updateMemberInformationError: "Error: your new email address must be different from your current email address."})
                        }
                        else if (member_email !== member.member_email){
                            member.member_email = member_email;
                            member.account_change.email_change.push(new Date().toISOString());
                            member.save((error => {
                                if(error){
                                    console.log(error);
                                    res.status(400).send(error);
                                }
                                else {
                                    console.log("Email address successfully updated.");
                                    res.status(200);
                                    return res.status(200).json(member_email);
                                }
                            }));
                        }
                    }

            }
        });
    }
};

//Delete a member's account (DELETE)
exports.delete = (req, res) => {
    id = req.body._id;
    Member.findOneAndDelete({_id: id},(error, member) => {
        if(error){
            console.log("Error, user not found in the database.");
            return res.status(400).json({deleteError: "User not found in the database."});
        }
        else {
            if (member === null) {
                console.log("Error, user not found in the database.");
                    return res.status(400).json({deleteError: "User not found in the database"});
            }
            else {
            console.log("Member with id " + id + " deleted.");
            return res.status(200).json({deleteSuccess: "User successfully deleted."});
            }
        }
    });
}

exports.updateEmail =(req, res) => {
//TODO -> Set up email sent to user upon changing their email address.
}
exports.initialRegistration =(req, res) => {
//TODO -> Handle initial registration email.
}

exports.forgotPassword = (req, res) =>{
    const sendTo = req.body.member_email;
    const resetPasswordLink = req.body.resetPasswordLink;
    Member.findOne({member_email: sendTo}, (error, member) => {
        if(error){
            console.log(error);
            return res.status(400).json({forgotPasswordError: "There is not an account associated with that email address. Please double-check your password."});
        }
        else {
            if(!member){
                console.log(error);
                return res.status(400).json({forgotPasswordError: "There is not an account associated with that email address. Please double-check your password."})
            }
            else {
                if (member.member_email === sendTo) {
                    const forgotPassword = {
                        from: "animatedneuroscience@gmail.com",
                        to: sendTo,
                        subject: "Animated Neuroscience Password Reset",
                        data: {userName: member.member_first, resetPasswordLink: resetPasswordLink}
                    }
                    Mailer.send(forgotPassword).then(r => {
                        console.log("Successfully sent forgot password email.");
                    }).catch(error => {
                        console.log(error)
                    });
                    return res.status(200).json({success: "Email sent"});
                }
            }
        }});
}



//List a member's animation data (GET)
exports.getAnimationProgress = (req, res) => {
    //to test in Postman: GET HTTP://localhost:8080/api/members/<memberId>/animations
    console.log("GETTING ANIMATIONS");

    console.log(req.member.animation_data);
    res.status(200);
    res.json(req.member.animation_data);
};
//List a member's animation completion progress (GET)
exports.getAnimationCompletion = (req, res) => {
    //to test in Postman: GET HTTP://localhost:8080/api/members/<memberId>/animations/completed
    let params = req.query;
    console.log(params);
    id = req.query._id;
    let animationCategory = req.query.animationCategory;
    let animationName= req.query.animationName;
    console.log(animationCategory);
    Member.findOne({_id: id},(error, member) => {
        //         //console.log(id);
        if (error) {
            return res.status(400).send(error);
        } else {
            switch (animationCategory){
                case "neurons":
                    switch (animationName) {
                        case "exploring":
                            return res.status(200).send(member.animation_data.neurons.exploring)
                        case "protein":
                            return res.status(200).send(member.animation_data.neurons.protein);
                        case "cellular":
                            return res.status(200).send(member.animation_data.neurons.cellular);
                        default:
                            return res.status(400).json({error: "Cannot find the specified animation"});
                    }
                case "glias":
                    switch(animationName){
                        case "astrocyte":
                            console.log("GETTING ASTROCYTE DATA: " + member.animation_data.glias.astrocyte);
                        return res.status(200).send(member.animation_data.glias.astrocyte);
                        case "oligodendroglia":
                            return res.status(200).send(member.animation_data.glias.oligodendroglia);
                        case "chemical":
                            return res.status(200).send(member.animation_data.glias.chemical);
                        case "cns":
                            return res.status(200).send(member.animation_data.glias.cns);
                        default:
                            return res.status(400).json({error: "Cannot find the specified animation"});
                    }
                    case "brain":
                    switch(animationName){
                        case "neural":
                            return res.status(200).send(member.animation_data.brain.neural);
                        case "early":
                            return res.status(200).send(member.animation_data.brain.early);
                        case "lobes":
                            return res.status(200).send(member.animation_data.brain.lobes);
                        case "structure":
                            return res.status(200).send(member.animation_data.brain.structure);
                        default:
                            return res.status(400).json({error: "Cannot find the specified animation"});
                    }
                    case "sensory":
                    switch(animationName){
                        case "visual":
                            return res.status(200).send(member.animation_data.sensory.visual);
                        case "auditory":
                            return res.status(200).send(member.animation_data.sensory.auditory);
                        case "olfactory":
                            return res.status(200).send(member.animation_data.sensory.olfactory);
                        case "pain":
                            return res.status(200).send(member.animation_data.sensory.pain);
                        default:
                            return res.status(400).json({error: "Cannot find the specified animation"});
                    }
                    case "cerebellum":
                    switch(animationName){
                        case "micro":
                            return res.status(200).send(member.animation_data.cerebellum.micro);
                        case "pathways":
                            return res.status(200).send(member.animation_data.cerebellum.pathways);
                        default:
                            return res.status(400).json({error: "Cannot find the specified animation"});
                    }
                case "nervous":
                    switch(animationName){
                        case "ans":
                            return res.status(200).send(member.animation_data.nervous.ans);
                        case "action":
                            return res.status(200).send(member.animation_data.nervous.action);
                        case "hypothalamus":
                            return res.status(200).send(member.animation_data.nervous.hypothalamus);
                        default:
                            return res.status(400).json({error: "Cannot find the specified animation"});
                    }
                default:
                    return res.status(400).json({error: "Cannot find the specified animation category"});
            }
        }});
};
//List a member's suggested animations (GET)
exports.getAnimationSuggested = (req, res) => {
    //to test in Postman: GET HTTP://localhost:8080/api/members/<memberId>/animations/suggested
    res.status(200);
    res.json(req.member.animation_data.suggested_animations);
};

exports.getAnimationSorted = async(req, res) => {
    /* To test in Postman:
    GET: HTTP://localhost:8080/api/members/<*member's id as a string without quotation marks*>/sorted
    Parameter 1: key: id, value: <*member's id as a string without quotation marks*>
    Parameter 2: sortBy, value: <one of the four options from the progress dropdown*>
     */
    /*Member.collection.updateMany({},
        { $set: {
            "animation_data.neurons.exploring.timeRemaining": 3,
            "animation_data.neurons.exploring.complete": false,
            "animation_data.neurons.exploring.completedActions": [],
            "animation_data.neurons.protein.timeRemaining": 5,
                "animation_data.neurons.protein.complete": false,
                "animation_data.neurons.protein.completedActions": [],
            "animation_data.neurons.cellular.timeRemaining": 5,
                "animation_data.neurons.cellular.complete": false,
                "animation_data.neurons.cellular.completedActions": [],
            "animation_data.glias.astrocyte.timeRemaining": 3,
                "animation_data.glias.astrocyte.complete": false,
                "animation_data.glias.astrocyte.completedActions": [],
            "animation_data.glias.oligodendroglia.timeRemaining": 3,
                "animation_data.glias.oligodendroglia.complete": false,
                "animation_data.glias.oligodendroglia.completedActions": [],
            "animation_data.glias.chemical.timeRemaining": 5,
                "animation_data.glias.chemical.complete": false,
                "animation_data.glias.chemical.completedActions": [],
            "animation_data.glias.cns.timeRemaining": 5,
                "animation_data.glias.cns.complete": false,
                "animation_data.glias.cns.completedActions": [],
            "animation_data.brain.neural.timeRemaining": 7,
                "animation_data.brain.neural.complete": false,
                "animation_data.brain.neural.completedActions": [],
            "animation_data.brain.early.timeRemaining": 3,
                "animation_data.brain.early.complete": false,
                "animation_data.brain.early.completedActions": [],
            "animation_data.brain.lobes.timeRemaining": 2,
                "animation_data.brain.lobes.complete": false,
                "animation_data.brain.lobes.completedActions": [],
            "animation_data.brain.structure.timeRemaining": 3,
                "animation_data.brain.structure.complete": false,
                "animation_data.brain.structure.completedActions": [],
            "animation_data.sensory.visual.timeRemaining": 10,
                "animation_data.sensory.visual.complete": false,
                "animation_data.sensory.visual.completedActions": [],
            "animation_data.sensory.auditory.timeRemaining": 5,
                "animation_data.sensory.auditory.complete": false,
                "animation_data.sensory.auditory.completedActions": [],
            "animation_data.sensory.olfactory.timeRemaining": 7,
                "animation_data.sensory.olfactory.complete": false,
                "animation_data.sensory.olfactory.completedActions": [],
            "animation_data.cerebellum.micro.timeRemaining": 3,
                "animation_data.cerebellum.micro.complete": false,
                "animation_data.cerebellum.micro.completedActions": [],
            "animation_data.cerebellum.pathways.timeRemaining": 3,
                "animation_data.cerebellum.pathways.complete": false,
                "animation_data.cerebellum.pathways.completedActions": [],
            "animation_data.nervous.ans.timeRemaining": 3,
                "animation_data.nervous.ans.complete": false,
                "animation_data.nervous.ans.completedActions": [],
            "animation_data.nervous.action.timeRemaining": 7,
                "animation_data.nervous.action.complete": false,
                "animation_data.nervous.action.completedActions": [],
            "animation_data.nervous.hypothalamus.timeRemaining": 5,
                "animation_data.nervous.hypothalamus.complete": false,
                "animation_data.nervous.hypothalamus.completedActions": [],
        }
});*/
    //To be used in animation progress page on frontend
    //returns the array of animation data (sorted according to req.body.filter)
    //to test in Postman: GET HTTP://localhost:8080/api/members/<memberId>/animations
    console.log("query: ");
    console.log(req.query);
    let id = req.query._id;
    console.log(id);
    var searchFor = mongoose.Types.ObjectId(id);
    let sortBy = req.query.sortBy;

    await Member.findOne({_id: searchFor}, (error, member) => {

        if (error) {
            console.log(error);
            return res.status(400).json({progressError: "There was an error returning the member's progress."});
        } else {
            if (member) {
                console.log(member);
                let baseArray = [];
                for (const prop in member.animation_data) {
                    if (member.animation_data.hasOwnProperty(prop) && (prop !== "completed_animations") && (prop !== "suggested_animations") && (prop !== "$init")) {
                        let complete = 0;
                        let remaining = 0;
                        let time = 0;
                        console.log(prop);
                        for (const property in member.animation_data[prop]) {
                            if (member.animation_data[prop].hasOwnProperty(property) && property !== "$init" && member.animation_data[prop] !== "$init") {
                                console.log(property + "  " + member.animation_data[prop][property].complete);
                                console.log(member.animation_data[prop][property]);
                                if (member.animation_data[prop][property].complete === true) {
                                    console.log("*** I AM COMPLETE***");
                                    complete += 1;
                                } else if (member.animation_data[prop][property].complete === false) {
                                    remaining += 1;
                                    time += member.animation_data[prop][property].timeRemaining;
                                }

                            }
                        }
                        let name = "";
                        switch (prop) {
                            case "neurons":
                                name = "Neurons";
                                break;
                            case "glias":
                                name = "Glias and Synapses";
                                break;
                            case "brain":
                                name = "The Brain";
                                break;
                            case "sensory":
                                name = "Sensory Systems";
                                break;
                            case "cerebellum":
                                name = "Cerebellum";
                                break;
                            case "nervous":
                                name = "Nervous System";
                                break;
                            default:
                                break;
                        }
                        baseArray.push({name: name, complete: complete, remaining: remaining, timeRemaining: time});
                        console.log(baseArray);
                    }
                }
                switch (sortBy) {
                    //if two or more categories have the same number of animations complete, sort by time remaining (high - low)
                    case "Number Completed (High - Low)":
                        baseArray.sort((a, b) => b.complete - a.complete);
                        console.log(baseArray);
                        baseArray.sort(function(a,b){
                           if (a.complete === b.complete){
                               if(a.timeRemaining > b.timeRemaining){
                                   return 1;
                               } else if(a.timeRemaining < b.timeRemaining){
                                   return -1;
                               } else {
                                   return 0;
                               }
                           }
                        });
                        console.log(baseArray);
                        break;
                    //if two or more categories have the same number of animations complete, sort by time remaining (low - high)
                    case "Number Completed (Low - High)":
                        baseArray.sort((a, b) => a.complete - b.complete);
                        console.log(baseArray);
                        baseArray.sort(function(a,b){
                            if (a.complete === b.complete){
                                if(a.timeRemaining > b.timeRemaining){
                                    return 1;
                                } else if(a.timeRemaining < b.timeRemaining){
                                    return -1;
                                } else {
                                    return 0;
                                }
                            }
                        });
                        break;
                        //if two or more categories have the SAME time remaining, sort by animations complete (high - low)
                    case "Time Remaining (High - Low)":
                        baseArray.sort((a, b) => b.timeRemaining - a.timeRemaining);
                        console.log(baseArray);
                        baseArray.sort(function(a,b){
                            if (a.timeRemaining === b.timeRemaining){
                                if(a.complete > b.complete){
                                    return 1;
                                } else if(a.complete < b.complete){
                                    return -1;
                                } else {
                                    return 0;
                                }
                            }
                        });
                        break;
                        //if two or more categories have the SAME time remaining, sort by number of animations complete (low - high)
                    case "Time Remaining (Low - High)":
                        baseArray.sort((a, b) => a.timeRemaining - b.timeRemaining);
                        console.log(baseArray);
                        baseArray.sort(function(a,b){
                            if (a.timeRemaining === b.timeRemaining){
                                if(a.complete > b.complete){
                                    return 1;
                                } else if(a.complete < b.complete){
                                    return -1;
                                } else {
                                    return 0;
                                }
                            }
                        });
                        break;
                    default:
                        return res.status(400).json({progressError: "An invalid sorting parameter was passed."});
                }
                return res.status(200).json({sortedData: baseArray});
            }
            else {
                return res.status(400).json({error: "No member"});
            }
        }
    });
};

//Update a member's completed animations
exports.updateAnimationProgress = (req, res) => {
    console.log(req.body);
    let _id = req.body._id;
    let animationCategory = req.body.animationCategory;
    let animationName= req.body.animationName;
    let action = req.body.action;
    let animationComplete = req.body.animationComplete;
    Member.findOne({_id: _id},(error, member) => {
        if (error) {
            return res.status(400).send(error);
        } else {
            let isComplete;
            let actionsCompleted;
            let checkCompletion = (array, target) => target.every(v => array.includes(v));

            //has member completed animation? = member.animation_data.<animationCategory>.<animationName>.complete = true || false
            //actions has a member completed in an animation = member.animation_data.<animationCategory>.<animationName>.completedActions = []
            if (animationCategory !== "" && animationName !== "" && action !== "") {
                switch (animationCategory){
                    case "neurons":
                        switch (animationName) {
                            case "exploring":
                                isComplete = member.animation_data.neurons.exploring.complete;
                                actionsCompleted = member.animation_data.neurons.exploring.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.neurons.exploring.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.neurons.exploring.completedActions;
                                }
                                console.log(checkCompletion(actionsCompleted, animationComplete));
                                if(checkCompletion(member.animation_data.neurons.exploring.completedActions, animationComplete)){
                                    member.animation_data.neurons.exploring.complete = true;
                                }
                                break;
                            case "protein":
                                isComplete = member.animation_data.neurons.protein.complete;
                                actionsCompleted = member.animation_data.neurons.protein.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.neurons.protein.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.neurons.protein.completedActions;

                                }
                                if(checkCompletion(member.animation_data.neurons.protein.completedActions, animationComplete)){
                                    member.animation_data.neurons.protein.complete = true;
                                }
                                break;
                            case "cellular":
                                isComplete = member.animation_data.neurons.cellular.complete;
                                actionsCompleted = member.animation_data.neurons.cellular.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.neurons.cellular.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.neurons.cellular.completedActions;

                                }
                                if(checkCompletion(member.animation_data.neurons.cellular.completedActions, animationComplete)){
                                    member.animation_data.neurons.cellular.complete = true;
                                }
                                break;
                            default:
                                return res.status(400).json({error: "Cannot find the specified animation"});
                        }
                        break;
                    case "glias":
                        switch(animationName){
                            case "astrocyte":
                                isComplete = member.animation_data.glias.astrocyte.complete;
                                actionsCompleted = member.animation_data.glias.astrocyte.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.glias.astrocyte.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.glias.astrocyte.completedActions;
                                }
                                if(checkCompletion(member.animation_data.glias.astrocyte.completedActions, animationComplete)){
                                    member.animation_data.glias.astrocyte.complete = true;
                                }
                                break;
                            case "oligodendroglia":
                                isComplete = member.animation_data.glias.oligodendroglia.complete;
                                actionsCompleted = member.animation_data.glias.oligodendroglia.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.glias.oligodendroglia.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.glias.oligodendroglia.completedActions;
                                }
                                if(checkCompletion(member.animation_data.glias.oligodendroglia.completedActions, animationComplete)){
                                    member.animation_data.glias.oligodendroglia.complete = true;
                                }
                                break;
                            case "chemical":
                                isComplete = member.animation_data.glias.chemical.complete;
                                actionsCompleted = member.animation_data.glias.chemical.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.glias.chemical.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.glias.chemical.completedActions;
                                }
                                if(checkCompletion(member.animation_data.glias.chemical.completedActions, animationComplete)){
                                    member.animation_data.glias.chemical.complete = true;
                                }
                                break;
                            case "cns":
                                isComplete = member.animation_data.glias.cns.complete;
                                actionsCompleted = member.animation_data.glias.cns.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.glias.cns.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.glias.cns.completedActions;
                                }
                                if(checkCompletion(member.animation_data.glias.cns.completedActions, animationComplete)){
                                    member.animation_data.glias.cns.complete = true;
                                }
                                break;
                            default:
                                return res.status(400).json({error: "Cannot find the specified animation"});
                        }
                        break;
                    case "brain":
                        switch(animationName){
                            case "neural":
                                isComplete = member.animation_data.brain.neural.complete;
                                actionsCompleted = member.animation_data.brain.neural.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.brain.neural.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.brain.neural.completedActions;
                                }
                                if(checkCompletion(member.animation_data.brain.neural.completedActions, animationComplete)){
                                    member.animation_data.brain.neural.complete = true;
                                }
                                break;
                            case "early":
                                isComplete = member.animation_data.brain.early.complete;
                                actionsCompleted = member.animation_data.brain.early.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.brain.early.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.brain.early.completedActions;
                                }
                                if(checkCompletion(member.animation_data.brain.early.completedActions, animationComplete)){
                                    member.animation_data.brain.early.complete = true;
                                }
                                break;
                            case "lobes":
                                isComplete = member.animation_data.brain.lobes.complete;
                                actionsCompleted = member.animation_data.brain.lobes.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.brain.lobes.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.brain.lobes.completedActions;
                                }
                                if(checkCompletion(member.animation_data.brain.lobes.completedActions, animationComplete)){
                                    member.animation_data.brain.lobes.complete = true;
                                }
                                break;
                            case "structure":
                                isComplete = member.animation_data.brain.structure.complete;
                                actionsCompleted = member.animation_data.brain.structure.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.brain.structure.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.brain.structure.completedActions;
                                }
                                if(checkCompletion(member.animation_data.brain.structure.completedActions, animationComplete)){
                                    member.animation_data.brain.structure.complete = true;
                                }
                                break;
                            default:
                                return res.status(400).json({error: "Cannot find the specified animation"});
                        }
                        break;
                    case "sensory":
                        switch(animationName){
                            case "visual":
                                isComplete = member.animation_data.sensory.visual.complete;
                                actionsCompleted = member.animation_data.sensory.visual.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.sensory.visual.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.sensory.visual.completedActions;
                                }
                                if(checkCompletion(member.animation_data.sensory.visual.completedActions, animationComplete)){
                                    member.animation_data.sensory.visual.complete = true;
                                }
                                break;
                            case "auditory":
                                isComplete = member.animation_data.sensory.auditory.complete;
                                actionsCompleted = member.animation_data.sensory.auditory.completedActions;
                                if(!(actionsCompleted.includes(action))) {
                                    member.animation_data.sensory.auditory.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.sensory.auditory.completedActions;
                                }
                                if(checkCompletion(member.animation_data.sensory.auditory.completedActions, animationComplete)){
                                    member.animation_data.sensory.auditory.complete = true;
                                }
                                break;
                            case "olfactory":
                                isComplete = member.animation_data.sensory.olfactory.complete;
                                actionsCompleted = member.animation_data.sensory.olfactory.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.sensory.olfactory.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.sensory.olfactory.completedActions;
                                }
                                if(checkCompletion(member.animation_data.sensory.olfactory.completedActions, animationComplete)){
                                    member.animation_data.sensory.olfactory.complete = true;
                                }
                                break;
                            case "pain":
                                isComplete = member.animation_data.sensory.pain.complete;
                                actionsCompleted = member.animation_data.sensory.pain.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.sensory.pain.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.sensory.pain.completedActions;
                                }
                                if(checkCompletion(member.animation_data.sensory.pain.completedActions, animationComplete)){
                                    member.animation_data.sensory.pain.complete = true;
                                }
                                break;
                            default:
                                return res.status(400).json({error: "Cannot find the specified animation"});
                        }
                        break;
                    case "cerebellum":
                        switch(animationName){
                            case "micro":
                                isComplete = member.animation_data.cerebellum.micro.complete;
                                actionsCompleted = member.animation_data.cerebellum.micro.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.cerebellum.micro.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.cerebellum.micro.completedActions;
                                }
                                if(checkCompletion(member.animation_data.cerebellum.micro.completedActions, animationComplete)){
                                    member.animation_data.cerebellum.micro.complete = true;
                                }
                                break;
                            case "pathways":
                                isComplete = member.animation_data.cerebellum.pathways.complete;
                                actionsCompleted = member.animation_data.cerebellum.pathways.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.cerebellum.pathways.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.cerebellum.pathways.completedActions;
                                }
                                if(checkCompletion(member.animation_data.cerebellum.pathways.completedActions, animationComplete)){
                                    member.animation_data.cerebellum.pathways.complete = true;
                                }
                                break;
                            default:
                                return res.status(400).json({error: "Cannot find the specified animation"});
                        }
                        break;
                    case "nervous":
                        switch(animationName){
                            case "ans":
                                isComplete = member.animation_data.nervous.ans.complete;
                                actionsCompleted = member.animation_data.nervous.ans.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.nervous.ans.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.nervous.ans.completedActions;
                                }
                                if(checkCompletion(member.animation_data.nervous.ans.completedActions, animationComplete)){
                                    member.animation_data.nervous.ans.complete = true;
                                }
                                break;
                            case "action":
                                isComplete = member.animation_data.nervous.action.complete;
                                actionsCompleted = member.animation_data.nervous.action.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.nervous.action.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.nervous.action.completedActions;
                                }
                                if(checkCompletion(member.animation_data.nervous.action.completedActions, animationComplete)){
                                    member.animation_data.nervous.action.complete = true;
                                }
                                break;
                            case "hypothalamus":
                                isComplete = member.animation_data.nervous.hypothalamus.complete;
                                actionsCompleted = member.animation_data.nervous.hypothalamus.completedActions;
                                if(!(actionsCompleted.includes(action))){
                                    member.animation_data.nervous.hypothalamus.completedActions.push(action);
                                    console.log("Pushed action to array");
                                    actionsCompleted = member.animation_data.nervous.hypothalamus.completedActions;
                                }
                                if(checkCompletion(member.animation_data.nervous.hypothalamus.completedActions, animationComplete)){
                                    member.animation_data.nervous.hypothalamus.complete = true;
                                }
                                break;
                            default:
                                return res.status(400).json({error: "Cannot find the specified animation"});
                        }
                        break;
                    default:
                        return res.status(400).json({error: "Cannot find the specified animation category"});
                }
                member.save((error => {
                    if(error){
                        console.log(error);
                        res.status(400).send(error);
                    }
                    else {
                        console.log("ACTIONS COMPLETED : " + actionsCompleted);
                        return res.status(200).json({actionsCompleted: actionsCompleted});
                    }
                }));
            }
            else {
                console.log(animationName);
                console.log(animationCategory);
                console.log(action);
                return res.status(400).json({updateAnimationError: "Either the animation's category, name, or action is an empty string."});
            }
        }});
};


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
                return res.status(400).send(error);
            }
            else {
                if (member.member_email === memberEmail){
                    return res.status(400).json({registerError: "There is already an account associated with that email address."});
                }
                // No member is the database is associated with the registration email (new user)
                else {
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
                        });f
                    });
                }
            }
        })
    }
}

exports.login = (req, res) => {
    /* To test in Postman:
    1. [POST] HTTP://localhost:8080/api/login
    2. Body -> raw -> JSON
    3. {
    "member_email": "xxxxxxx",
    "member_password": "yyyyyyyy"
    }
    4. Press Send
    */
    const {loginError, loginValid} = validateLogin(req.body);
    if (!loginValid){
        console.log(loginError);
        return res.status(400).json(loginError);
    }
    else {
        const memberEmail = req.body.member_email;
        const memberPassword = req.body.member_password;
        Member.findOne({member_email: memberEmail},(error, member) => {
            if(error){
                return res.status(400).send(error);
            }
            else {
                if(member === null){
                //
                }
                else {
                    //memberPassword -> plain text password
                    //member.member_password -> hashed password associated with member in database
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
exports.findMemberById = (req, res, next, id) => {
    Member.findById(id).exec((error, member) => {
        if (error) {
            res.status(400);
            return res.status(400).json({memberWithId: 'A member with that ID does not exist in the database.'});
        } else {
            req.member = member;
            next();
            console.log("A member was found in database with the given ID.");
        }
    });
}






