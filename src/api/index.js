const Router = require('koa-router');
const router = new Router();
const auth = require('./auth');

router.use('/auth', auth.routes());

module.exports = router;
