const Email = require("email-templates");
const nodemailer = require('nodemailer');
const ck = require('ckey');

class Mail {
    //TODO -> change so it takes in a parameter of which email to send (initial email, change password email, 'change email' email)
    static async send(message){
        let user = process.env.LOGIN_EMAIL || ck.LOGIN_EMAIL;
        let password = process.env.PASSWORD_EMAIL || ck.PASSWORD_EMAIL;
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: password
            }
        });

       transport.verify((error, success) => {
            if(error){
                console.log(error);
            } else {
                console.log("Email server is ready to send messages.");
            }
        });

        try {
            const {from, to, subject, data} = message;
            let sendTheEmail = false;
            if (process.env.NODE_ENV === "production"){
                sendTheEmail = true;
            }
            if(process.env.NODE_ENV === "debug" || process.env.NODE_ENV === "development"){
                //SET BACK TO FALSE AFTER MANUAL TESTING
                sendTheEmail = true;
            }
            const email = new Email({
                views: {root: "email/emailTemplates"},
                preview: false,
                send: {sendTheEmail},
                transport : transport,
                htmlToText: false
            });
            console.log(process.env.NODE_ENV);
            if (process.env.NODE_ENV === "development"){
                await email.send({
                    message: {
                        from, to, subject, html: await email.render("forgotPasswordHTML", data)
                    },
                    transport: {
                        jsonTransport: true
                    },
                }).then(console.log).catch(console.error);
            }
            //***IF THE APP IS IN PRODUCTION (NOT DEBUG OR DEVELOPMENT)
            else {
                email.send({
                    template: "forgotPassword",
                    message: {
                        to: to,
                        from: from,
                        subject:subject
                    }, locals: {
                        userName: data.userName,
                        resetPasswordLink: data.resetPasswordLink
                    }
                }).then(()=>{
                    console.log("Sent email");
                })
            }
        } catch(error){
            console.log(error);
        }
    }
}
module.exports = Mail;

