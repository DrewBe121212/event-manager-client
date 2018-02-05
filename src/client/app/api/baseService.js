import axios from 'axios';

class BaseService {

  constructor(resource) {
    this.axios = axios;
  }

  find(params) {
    return this.axios.get(this.resource, params);
  }

  findById(id) {
    return this.find({id: id});
  }

  create(params) {

  }

  update(id, params) {

  }

  remove(id) {

  }

}

export {BaseService};
