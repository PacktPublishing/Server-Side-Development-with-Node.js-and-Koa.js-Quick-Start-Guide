const Koa = require('koa');
const app = new Koa();

// define generic error handler
const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.expose ? err.message : 'An error occurred!';
  }
}

// register generic error handler middleware
app.use(errorHandler);

// define json request error handler
const jsonErrorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const isJson = ctx.get('Accept') === 'application/json';
    if (isJson) {
      ctx.status = err.status || 500;
      ctx.body = {
        error: `An error just occurred`
      }
    } else {
      throw err;
    } 
  }
}

// register json error handler middleware
app.use(jsonErrorHandler);

app.use(async ctx => {
  const user = 'anonymous';
  ctx.throw(401, 'Access denied to the resource', { user });
});

const port = 1234;
app.listen(port, () => {
 console.log(`The app is running on port ${port}`);
});