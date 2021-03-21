/*
-Model for Member in Database-
role -> whether visitor or user (do they have an account?)
email -> the email associated with the member
password -> member's password
creation_date -> date of member account creation
login_dates -> keep track of login sessions
account_change -> keep track of instances member modifies account info (ex. change password, change username, change email)
animation_data -> keep track of which animations members has completed
 */
const mongoose = require('mongoose'), Schema = mongoose.schema;

const memberSchema = new Schema({
    role: {type: String, default: 'guest'},
    email: {type: String, default: 'guest'},
    password: {type: String, default: 'guest'},
    creation_date: Date,
    login_dates: Date,
    account_change: Date,
    animation_data: {
        completed_animations: {type: Array},
        suggested_animations: {type: Array},
        neurons: {
            exploring: {type: Boolean},
            protein: {type: Boolean},
            cellular: {type: Boolean},
        },
    }
});

memberSchema.pre('save', function(next){
    const timeDate = new Date();
    this.login_dates += timeDate; //Aadd
    if(created_date === null){
        this.creationDate = timeDate;
    }
    next();
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;