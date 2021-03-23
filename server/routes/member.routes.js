const members = require('../controllers/members.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/')
    .get(members.test);

router.route('/')
/*    .get(members.list);*/

/*router.route('/search')
    .get(members.filterMembers);*/

/*router.route('/:memberId')
    .get(members.read)
    .put(members.update)
    .delete(members.delete);*/

/*router.route('/:memberId/animations')
    .get(members.getAnimationProgress);*/

router.route('/register')
    .post(members.register);

/*router.route('/login')
    .post(members.login);*/

//router.param('memberId', members.memberByID);
module.exports = router;