app.get('/category/:slug', (req, res, next)) => {
  const { slug } = req.params;

  Category.findOne({ slug }, (err, category) => {
    if (err) {
      return next(err);
    }

    Product.find({ category: category.id }, (err, products) => {
      if (err) {
        return next(err);
      }

      res.send(products);
    });
  });
});