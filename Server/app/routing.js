const Router = require('koa-router');

const _ = new Router();

const createCommonRoutes = (opts) => {
  const { routeController, name, allPrivate } = opts;
  const fields = [
    { verb: 'get', method: 'get', pub: true },
    { verb: 'get', method: 'getById', pub: true, param: 'id' },
    { verb: 'post', method: 'create' },
    { verb: 'put', method: 'update', param: 'id' },
    { verb: 'delete', method: 'delete', param: 'id' },
  ];

  fields.forEach(({ verb, method, pub, param }) => {
    const params = param ? `/:${param}` : '';
    const prefix = !allPrivate && pub ? '/public' : '';
    const uri = `${prefix}/${name}${params}`;

    _[verb](uri, routeController[method]);
  });
};

module.exports = (app) => {
  const { users } = require('./routes');

  _.get('/', (ctx) => {
    ctx.body = { data: 'Hello User' };
  });

  _.get('/users', users.get);
  _.get('/users/:id', users.getById);
  _.post('/public/user', users.create);
  _.put('/user', users.update);
  _.get('/users', users.getCounter);
  _.put('/users', users.updateCount);

  createCommonRoutes({ routeController: users, name: 'users' });

  app.use(_.routes());

  return _;
};
