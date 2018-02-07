import {baseService} from './baseService';

class User extends baseService {
  constructor() {
    super('user');
  }

  login(username, password) {

  }

}

export {new User as User};
