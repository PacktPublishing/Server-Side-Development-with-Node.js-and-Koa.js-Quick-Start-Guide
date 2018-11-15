const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-body');
const router = require('./middleware/router');
const validator = require('./middleware/validator');
const app = new Koa();

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/koa-contact',
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', error => {
  throw new Error(`error connecting to db: ${error}`);
});
db.once('open', () => console.log('database connected'));

app.use(logger());

app.use(bodyParser());

app.use(validator());

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);