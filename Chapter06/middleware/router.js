// ./middleware/router.js
const KoaRouter = require('koa-router');
const authenticated = require('./authenticated');
const guest = require('./guest');
const user = require('./user');
const authController = require('../controllers/AuthController');
const postController = require('../controllers/PostController');

const router = new KoaRouter();
router.use(user());

// auth routes
const auth = new KoaRouter()
  .get('/', guest(), authController.index)
  .post('/login', authController.login)
  .post('/register', authController.register)
  .get('/logout', authController.logout);
router.use('/auth', auth.routes());

// blog post routes
const posts = new KoaRouter();
posts
  .use(authenticated())
  .post('/', postController.store)
  .get('/create', postController.create)
  .put('/:id', postController.update)
  .get('/:id/edit', postController.edit);
router.use('/post', posts.routes());

// base routes.
// authentication not required
router
  .get('/', postController.index)
  .get('/post/:id', postController.show);

module.exports = router;