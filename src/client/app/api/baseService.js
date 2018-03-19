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

  axios(method = 'get', endpoint, params, client='eventManager') {
    if (clients[client]) {
      return clients[client].request({
        method: method,
        url: endpoint,
        data: params
      });
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
