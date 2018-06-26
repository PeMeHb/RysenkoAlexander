const Controller = require('./controller');

class Game extends Controller {
  constructor(name) {
    super(name);

    this.create = this.create.bind(this);
  }


  async update(ctx, next) {
    const updatedItem = ctx.request.body;
    const updatedItem2 = ctx.request.body.counter;

    console.log(updatedItem, updatedItem2);


    await super.update(ctx, next);
  }



/*  async create(ctx, next) {
    const product = await this.findByField('title', ctx.request.body.title);

    if (product) {
      ctx.status = 403;
      ctx.body = { error: 'Not unique title' };
    } else {
      await super.create(ctx, next);
    }
  }*/

}

module.exports = new Game('game');
