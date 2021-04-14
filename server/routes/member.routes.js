const members = require('../controllers/members.controller'),
    express = require('express'),
    router = express.Router();

router.param('memberId', members.findMemberById);

router.route('/')
    .get(members.list);

router.route('/register')
    .post(members.register);

router.route('/login')
    .post(members.login);

router.route('/initialRegistration')
    .post(members.initialRegistration);

router.route('/updateEmail')
    .post(members.updateEmail);

router.route('/forgotPassword')
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

router.route('/:memberId/sorted')
    .get(members.getAnimationSorted);

module.exports = router;