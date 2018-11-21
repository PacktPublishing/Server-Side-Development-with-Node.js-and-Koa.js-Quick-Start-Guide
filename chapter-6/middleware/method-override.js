// ./middleware/method-override.js

module.exports = () => {
  return async (ctx, next) => {
    const { method } = ctx.request.body;
    if (method) ctx.method = method;
    await next();
  };
};