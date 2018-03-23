const Router = require('koa-router');
const router = new Router();
const authCtrl = require('./auth.controller');

router.post('/signup', authCtrl.signUp);
router.post('/signin',authCtrl.signIn);
router.get('/exists/:key(email|username)/:value',authCtrl.exists);
router.post('/signout',authCtrl.signOut);

module.exports = router;

