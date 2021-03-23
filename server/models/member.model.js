/*
-Model for Member in Database-
role -> whether visitor or user (do they have an account?)
email -> the email associated with the member
password -> member's password
creation_date -> date of member account creation
login_dates -> keep track of login sessions
account_change -> keep track of instances a member modifies account info (ex. change password, change username, change email)
animation_data -> keep track of which animation status for a member
.....completed_animations -> keep track of completed animations
.....suggested_animations -> track suggested animations to user, remove from suggestion when user visits that URL
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const memberSchema = new Schema({
    member_first: {type: String, default: 'first'},
    member_last: {type: String, default: 'last'},
    member_role: {type: String, default: 'guest'},
    member_email: {type: String, default: 'guest', lowercase: true},
    member_password: {type: String, default: 'guest'},
    member_password_confirm: {type: String, default: 'guest'},
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
        glias: {
            astrocyte: {type: Boolean},
            oligodendroglia: {type: Boolean},
            chemical: {type: Boolean},
            cns: {type: Boolean}
        },
        brain:{
            neural: {type: Boolean},
            early: {type: Boolean},
            lobes: {type: Boolean},
            structure: {type: Boolean}
        },
        sensory: {
            visual: {type: Boolean},
            auditory: {type: Boolean},
            olfactory: {type: Boolean},
            pain: {type: Boolean}
        },
        cerebellum: {
            micro: {type: Boolean},
            pathways: {type: Boolean}
        },
        nervous: {
            ans: {type: Boolean},
            action: {type: Boolean},
            hypothalamus: {type: Boolean}
        }
    }
});

memberSchema.pre('save', function(next){
    const timeDate = new Date();
    this.login_dates += timeDate; //Add
    if(this.creation_date === null){
        this.creation_date = timeDate;
    }
    next();
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;