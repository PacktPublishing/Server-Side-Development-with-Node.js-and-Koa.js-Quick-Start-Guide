// ./middleware/guest.js

module.exports = () => {
  return async (ctx, next) => {
    const { user } = ctx.session;
    if (user) ctx.redirect('/');
    else await next();
  };
};