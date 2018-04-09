import {BaseService} from './baseService';

class Session extends BaseService {
  constructor() {
    super('sessions');
  }

  authenticate(username, password) {
    return this.axios('POST', null, {
      username,
      password
    });
  }

}

export const SessionService = new Session();
