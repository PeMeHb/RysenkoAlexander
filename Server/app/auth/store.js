const { randomBytes } = require('crypto');
const db = require('../db');

class LocalStore {
  static getID(length) {
    return randomBytes(length).toString('hex');
  }

  async get(sid, ctx) {
    const users = await db.get('users');
    const usersGame = await db.get('game');
    const user = users.find(usr => usr.sid === sid);
    const game = usersGame.find(game => game.sid === sid);
    const session = user && { passport: { user: user.id, game: game.id } } || false;

    return session;
  }

  async set(session, { sid = LocalStore.getID(24), maxAge = 1000000 } = {}, ctx) {
    try {
      const users = await db.get('users');
      const usersGame = await db.get('game');
      const user = users.find(item => session.passport && item.id === session.passport.user);
      const userGame = usersGame.find(item => session.passport && item.id === session.passport.user);
      user.sid = sid;
      userGame.sid = sid;
      await db.write('users', users, user);
      await db.write('game', usersGame, userGame);
    } catch (e) {
      console.log('Error set user sid', e);
    }
    return sid;
  }

  async destroy(sid) {
    try {
      const users = await db.get('users');
      const games = await db.get('game');
      const user = users.find(item => item.sid === sid);
      const game = games.find(item => item.sid === sid);

      delete user.sid;
      delete game.sid;
      await db.write('users', users, user);
      await db.write('game', games, game);
    } catch (e) {
      console.log('Error remove sid', e);
    }

    delete this.sessions[sid];
  }
}

module.exports = LocalStore;
