const Controller = require('./controller');
const db = require('../db');

class Game extends Controller {
  constructor(name) {
    super(name);

    this.getCounter = this.getCounter.bind(this);
    this.updateCount = this.updateCount.bind(this);
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

}

module.exports = new Game('game');
