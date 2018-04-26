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

  constructor(resource) {
    this.resource = resource;
  }

  axios(method = 'GET', endpoint = null, params, client='eventManager') {
    
    const extension = '.json';
    let url = '';

    if (endpoint && endpoint.length > 0) {
      url = path.resolve(this.resource, endpoint + extension);
    } else {
      url = this.resource + extension;
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

  get(id = null) {
    return this.axios('GET', id);
  }

  create(params) {
    return this.axios('POST', null, params);
  }

  update(id, params) {
    return this.axios('PUT', id, params);
  }

  delete(id = null) {
    return this.update(id, { deleted: true });
  }

  destroy(id = null) {
    return this.axios('DELETE', id);
  }

}
