require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = new Koa();
const router = new Router();
const api = require('./api');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongo_URI)
    .then(res => console.log('mongoDB connect success!'))
    .catch(err => console.log(err));



app.use(logger());
app.use(bodyParser())
router.use('/api', api.routes())
app.use(router.routes()).use(router.allowedMethods)

router.get('/', (ctx, next) => {
    ctx.body = 'hello server'
})

app.listen(port, ()=>{
    console.log('server running')
})
