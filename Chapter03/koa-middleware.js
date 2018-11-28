// initialize Koa
const Koa = require('koa');
const app = new Koa();

// create middleware function
const responseTimer = async (ctx, next) => {
  const { method, path } = ctx.request;
  const start = Date.now();
  await next();
  const timeTaken = (Date.now() - start) / 1000; // divide by 1000 to get time in seconds
  console.log(`${method} request to ${path} took ${timeTaken}s`);
};

// register middleware
app.use(responseTimer);

// send response back
app.use(async ctx => {
  ctx.body = 'Hello World';
});

// start application
app.listen(1234, () => {
  console.log('Server is running on port 1234')
});