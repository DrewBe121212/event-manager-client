import axios from 'axios';
import path from 'path';
import {config} from 'config';

const clients = {
  eventManager: axios.create({
    baseURL: config.API.EVENT_MANAGER,
    responseType: 'json',
  })
};

export class BaseService {

  constructor(resources) {
    this.resources = resources;
  }

  axios(method = 'GET', endpoint = null, params, client='eventManager') {
    
    const extension = '.json';
    let url = '';

    if (endpoint && endpoint.length > 0) {
      url = path.resolve(this.resources, endpoint + extension);
    } else {
      url = this.resources + extension;
    }

    if (clients[client]) {
      return clients[client].request({
        method: method.toUpperCase(),
        url,
        data: params
      });
    }
  }

  find(params) {
    return this.axios('GET', null, params);
  }

  get(id) {
    return this.axios('GET', id);
  }

  create(params) {
    return this.axios('POST', null, params);
  }

  update(id, params) {
    return this.axios('PUT', id, params);
  }

  remove(id) {
    return this.axios('DELETE', id);
  }

}
