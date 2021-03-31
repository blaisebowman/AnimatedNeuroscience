const members = require('../controllers/members.controller.js'),
    emails = require('../controllers/email.controller.js'),
    express = require('express'),
    router = express.Router();

module.exports = router;

router.param('memberId', members.findMemberById);
let memberId = members.findMemberById;

router.route('/')
    .get(members.list);

/*router.route('/search')
    .get(members.filterMembers);*/

router.route('/register/')
    .post(members.register);

router.route('/login')
    .post(members.login);

router.route('/initialRegistration')
    .post(members.initialRegistration);

router.route('/updateEmail')
    .post(members.updateEmail);

router.route('/:memberId/forgotPassword')
    .post(members.forgotPassword);

router.route('/:memberId/read')
    .post(members.read);

router.route('/:memberId')
    .get(members.read)
    .post(members.update)
    .delete(members.delete);

router.route('/:memberId/animations')
    .get(members.getAnimationProgress);

router.route('/:memberId/animations/completed')
    .get(members.getAnimationCompletion)
    .post(members.updateAnimationProgress);

router.route('/:memberId/animations/suggested')
    .get(members.getAnimationSuggested);






/*
router.param('memberId', members.findMemberById);
*/
module.exports = router;