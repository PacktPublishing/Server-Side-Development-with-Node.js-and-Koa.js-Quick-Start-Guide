module.exports = () => {
  return async (ctx, next) => {
    const { user } = ctx.session;
    if (user) await next();
    else ctx.redirect('/auth');
  };
};