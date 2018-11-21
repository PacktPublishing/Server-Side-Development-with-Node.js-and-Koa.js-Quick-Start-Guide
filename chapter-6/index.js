const Koa = require('koa');
const views = require('koa-views');
const bodyParser = require('koa-body');
const session = require('koa-session');
const router = require('./middleware/router');
const methodOverride = require('./middleware/method-override');
const initDb = require('./db');

// initialize database
initDb();

// create app instance
const app = new Koa();
app.keys = ['secret key'];

// register middlware
app.use(views(`${__dirname}/views`, {
  extension: 'ejs'
}));
app.use(bodyParser());
app.use(session(app));
app.use(methodOverride());
app.use(router.routes());

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));