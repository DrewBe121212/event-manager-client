import {BaseService} from './baseService';

class User extends BaseService {
  constructor() {
    super('user', 'users');
  }

  authenticate(user, password) {
    return this.axios('post', 'authenticate', {
      user,
      password
    });
  }

}

export const UserService = new User();
