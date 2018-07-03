const Controller = require('./controller');


class Game extends Controller {
  constructor(name) {
    super(name);

    this.getCounter = this.getCounter.bind(this);
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
}

module.exports = new Game('game');
