const Post = require('../models/Post');

module.exports = {
  async index(ctx) {
    const posts = await Post.find()
    .populate('author');
    ctx.state.posts = posts;
    ctx.state.title = 'Home';
    await ctx.render('index');
  },

  async create(ctx) {
    ctx.state.title = 'Create Post';
    await ctx.render('post/create');
  },

  async store(ctx) {
    const { body } = ctx.request;
    const postData = {
      ...body,
      author: ctx.session.user,
      image: 'https://picsum.photos/300/?random'
    };
    const post = await new Post(postData).save();
    ctx.redirect(`/post/${post.id}`);
  },

  async show(ctx) {
    const { id } = ctx.params;
    try {
      const post = await Post.findById(id).populate('author');
      ctx.state.post = post;
      ctx.state.title = post.title;
    } catch(e) {
      ctx.throw(404, "Post not found");
    }
    await ctx.render('post/show');
  },

  async edit(ctx) {
    const { id } = ctx.params;
    try {
      const post = await Post.findById(id).populate('author');
      ctx.state.post = post;
      ctx.state.title = `Edit Post - ${post.title}`;
    } catch(e) {
      ctx.throw(404, "Post not found");
    }
    await ctx.render('post/edit');
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    try {
      const postData = { ...body, createdAt: new Date() }
      const post = await Post.findByIdAndUpdate(id, postData);
      ctx.redirect(`/post/${post.id}`);
    } catch(e) {
      ctx.throw(e);
    }
  }
};