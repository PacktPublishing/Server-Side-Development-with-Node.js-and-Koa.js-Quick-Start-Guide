const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb://localhost:27017/koa-blog',
    { useNewUrlParser: true }
  );

  const db = mongoose.connection;
  db.on('error', error => {
    throw new Error(`error connecting to db: ${error}`);
  });
  db.once('open', () => console.log('database connected'));
};