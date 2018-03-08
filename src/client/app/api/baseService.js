import {config} from 'config';
import axios from 'axios';
import path from 'path';

const clients = {
  eventManager: axios.create({
    baseURL: config.API.EVENT_MANAGER,
    responseType: 'json'
  })
};

export class BaseService {

  constructor(resource, resources) {
    this.resource = resource;
    this.resources = resources;
  }

  axios(method, endpoint, params, client='eventManager') {
    if (clients[client]) {
      return clients[client].call(method, path.resolve(this.resource, endpoint), params);
    }
  }

  find(params) {
    return this.axios('get', '', params);
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
