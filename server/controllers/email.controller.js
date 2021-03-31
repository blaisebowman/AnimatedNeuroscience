const Email = require('email-templates');

const email = new Email({
   message: {
       from: 'animatedneuroscience@protonmail.com'
   },
    //send: true,
    transport: {
       jsonTransport: true
    }
});
//PUT EXPORT, MAKE EMAIL ROUTES
email.send({
    template: 'passwordReset',
    message: {
        to: 'thisuserjustresettheirpassword@reset.com'
    },
    locals: {
        name: 'Elon'
    }
}).then(console.log).catch(console.error);