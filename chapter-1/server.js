const Koa = require('koa');
const app = new Koa();

app.use(asyncctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);