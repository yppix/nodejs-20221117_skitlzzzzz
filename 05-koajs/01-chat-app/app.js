const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();
const clients = new Set();

router.get('/subscribe', async (ctx, next) => {
  const message = await new Promise((resolve, reject)=>{
    clients.add(resolve);
  });
  ctx.body = message;
});

router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;
  if (!message) {
    ctx.throw(400, 'need message');
  }

  clients.forEach(function(resolve) {
    resolve(message);
  });

  clients.clear();

  ctx.body = 'ok';
});

app.use(router.routes());

module.exports = app;
