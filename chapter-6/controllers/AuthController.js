const User = require('../models/User');
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;

module.exports = {
  async index(ctx) {
    ctx.state = { title: 'Login or Register' };
    await ctx.render('auth');
  },

  async register(ctx) {
    const { body } = ctx.request;
    const userData = {
      ...body,
      password: await bcrypt.hash(body.password, BCRYPT_SALT_ROUNDS)
    };
    const user = await new User(userData).save();
    ctx.session.user = user;
    ctx.redirect('/');
  },

  async login(ctx) {
    const { body } = ctx.request;
    const user = await User.findOne({ email: body.email });
    if (!user) ctx.throw(404, 'user not found');
    const isValid = await bcrypt.compare(body.password, user.password);
    if (isValid) {
      ctx.session.user = user;
      ctx.redirect('/');
    } else {
      ctx.redirect('/auth');
    }
  },

  async logout(ctx) {
    delete ctx.session.user;
    ctx.redirect('/auth');
  }
};