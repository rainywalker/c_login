require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongo_URI)
    .then(res => console.log('mongoDB connect success!'))
    .catch(err => console.log(err));



app.use(logger());
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods)

router.get('/', (ctx, next) => {
    ctx.body = 'hello server'
})

app.listen(port, ()=>{
    console.log('server running')
})
