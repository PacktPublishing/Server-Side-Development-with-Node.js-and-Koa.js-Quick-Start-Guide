app.get('/category/:slug', async ctx => {
  const { slug } = ctx.params;
  const category = await Category.findOne({ slug });
  const products = await Product.find({ category: category.id });
  ctx.body = products;
});