import BaseService from 'api/baseService';

class Menu extends BaseService {
  constructor() {
    super('menus');

  }
  
}

export const MenuService = new Menu();