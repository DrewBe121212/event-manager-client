import BaseService from 'api/baseService';

class Session extends BaseService {
  constructor() {
    super('session');
  }

  authenticate(username, password) {
    return this.create({
      username,
      password
    });
  }

  profile() {
    return this.get();
  }
}

export const SessionService = new Session();
