const KoaRouter = require('koa-router');
const router = new KoaRouter();
const contactController = require('../controllers/ContactController');

router
  .get('/', async ctx => (ctx.body = 'Welcome to the contacts API!'))
  .get('/contact', contactController.index)
  .post('/contact', contactController.store)
  .get('/contact/:id', contactController.show)
  .put('/contact/:id', contactController.update)
  .delete('/contact/:id', contactController.destroy);

module.exports = router;
