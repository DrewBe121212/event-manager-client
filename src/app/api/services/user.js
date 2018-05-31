import BaseService from 'api/baseService';

class User extends BaseService {
  constructor() {
    super('users');
  }
}

export const UserService = new User();
