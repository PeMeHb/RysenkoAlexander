const session = require('koa-session2');
const passport = require('koa-passport');
const route = require('koa-route');
const Store = require('./store');
const db = require('../db');

const store = new Store();

const initPassport = (app) => {
  app.keys = ['secret'];
  app.use(session({
    key: 'ECSID',
    maxAge: 24 * 60 * 60 * 1000,
    saveUninitialized: true,
    resave: true,
    store,
  }));

  require('./auth');
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(route.post('/public/login', ctx => passport.authenticate('local', (err, user) => {
    if (!user) {
      ctx.status = 401;
      ctx.body = { error: 'Email or password are wrong' };
    } else {
      ctx.body = { ...user };
      return ctx.login(user);
    }
  })(ctx)));

  app.use(route.get('/public/checkUser', async (ctx) => {
    const cookie = ctx.cookies.get('ECSID');

    try {
      const users = await db.get('users');
      const user = users.find(item => item.sid && cookie === item.sid);

      if (user) {
        delete user.sid;
        delete user.password;
        ctx.body = user;
      } else {
        ctx.status = 404;
        ctx.body = { error: 'User is not authenticated' };
      }
    } catch (e) {
      console.log('Error get user', e);
    }
  }));

  app.use(route.get('/logout', async (ctx) => {
    store.destroy(ctx.cookies.get('ECSID'));
    ctx.logout();
    ctx.body = { data: 'ok' };
  }));

  app.use(route.get('/game', async (ctx) => {

    try {
      const gameCounter = await db.get('game');
      ctx.body = gameCounter;

    } catch (e) {
      console.log('Error get user', e);
    }

  }));

  app.use(async (ctx, next) => {
    const publicPath = ctx.url.includes('public') || ctx.url === '/';

    if (publicPath || ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.body = { success: false };
      ctx.throw(401);
    }
  });
};

module.exports = initPassport;
