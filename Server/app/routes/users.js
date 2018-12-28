const Controller = require('./controller');
const db = require('../db');

const fields = ['email', 'firstName', 'lastName', 'password', 'id', 'sid', 'X', '0'];

class User extends Controller {
  constructor(name) {
    super(name);

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getCounter = this.getCounter.bind(this);
    this.updateCount = this.updateCount.bind(this);
  }

  async create(ctx, next) {
    const user = await this.findByField('email', ctx.request.body.email);

    if (user) {
      ctx.status = 403;
      ctx.body = { error: 'Not unique email' };
    } else {
      this.clearUser(ctx.request.body);
      await super.create(ctx, next)
    }
  }

  async update(ctx, next) {
    const updatedUser = ctx.request.body;
    const users = await this.getValue();
    const user = users.find(usr => usr.email === updatedUser.email);

    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'There is no user with such email' };
      return;
    }

    delete updatedUser.email;

    if (!updatedUser.password) {
      delete updatedUser.password;
    }

    this.clearUser(updatedUser);

    Object.assign(user, updatedUser);

    const response = { ...user };
    delete response.sid;
    delete response.password;
    ctx.body = await db.write(this.name, users, response);

    await next();
  }

  async getCounter(ctx) {
    const gameData = await this.getValue();
    const cookie = ctx.cookies.get('ECSID');
    try {
      const user = gameData.find(item => item.sid && cookie === item.sid);

      if (user) {
        delete user.sid;
        ctx.body = user;
      } else {
        ctx.status = 404;
        ctx.body = { error: 'User is not authenticated' };
      }
    } catch (e) {
      console.log('Error get user', e);
    }
  }

  async updateCount(ctx, next) {
    const oldCounts = await this.getValue();
    const newCount = ctx.request.body;
    const cookie = ctx.cookies.get('ECSID');
    try {
      const userCount = oldCounts.find(item => item.sid && cookie === item.sid);
      if (userCount) {
        Object.assign(userCount, newCount);
        ctx.body = await db.write(this.name, oldCounts);
      } else {
        ctx.status = 404;
        ctx.body = { error: 'User is not authenticated' };
      }
    } catch (e) {
      console.log('Error get user', e);
    }

    await next();
  }

  clearUser(user = {}) {
    Object.keys(user).forEach((key) => {
      if (fields.indexOf(key) === -1) {
        delete user[key];
      }
    });
  }
}

module.exports = new User('users');
