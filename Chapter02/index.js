const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(1234, () => {
  console.log('Server is running on port 1234')
});