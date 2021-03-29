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
    member_email: {type: String, default: 'guest'},
    member_password: {type: String, default: 'guest'},
    member_password_confirm: {type: String, default: 'guest'},
    creation_date: Date,
    login_dates: [{type: Date}],
    account_change: {
        email_change: [Date],
        password_change: [Date]
    },
    animation_data: {
        completed_animations: {type: Array, default: []},
        suggested_animations: {type: Array, default: []},
        neurons: {
            exploring: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            protein: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            cellular: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}}
        },
        glias: {
            astrocyte: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            oligodendroglia: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            chemical: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            cns: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}}
        },
        brain:{
            neural: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            early: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            lobes: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            structure: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}}
        },
        sensory: {
            visual: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            auditory: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            olfactory: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            pain: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}}
        },
        cerebellum: {
            micro: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            pathways: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}}
        },
        nervous: {
            ans: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            action: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}},
            hypothalamus: {complete: {type: Boolean, default: false}, completedActions: {type: [String], default: []}}
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