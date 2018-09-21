import path from 'path';
import axios from 'axios';
import clients from './clients';

class BaseService {

  constructor(resource) {
    this.resource = resource;
  }

  axios(method = 'GET', endpoint = null, params, client = 'eventManager') {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const extension = '.json';
    let url = '';

    if (endpoint && endpoint.length > 0) {
      url = path.resolve(this.resource, endpoint + extension);
    } else {
      url = this.resource + extension;
    }

    if (clients[client]) {
      return {
        promise: clients[client].request({
          method: method.toUpperCase(),
          url,
          data: params,
          cancelToken: source.token
        }),
        cancel: (message) => source.cancel(message),
        isCancel: axios.isCancel
      };
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

export default BaseService;