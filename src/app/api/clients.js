import axios from 'axios';
import config from 'config';

const clients = {
  eventManager: axios.create({
    baseURL: config.API.EVENT_MANAGER,
    responseType: 'json'
  })
};

export default clients;