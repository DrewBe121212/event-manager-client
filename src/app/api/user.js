import {BaseService} from './baseService';

class User extends BaseService {
  constructor() {
    super('users');
  }
}

export const UserService = new User();
