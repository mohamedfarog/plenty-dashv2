
import axios from 'axios';
import {getItem} from './localStorage'
//const API_ENDPOINT = "https://plentyv2.mvp-apps.ae/admin";
const API_ENDPOINT = "http://127.0.0.1:8000/admin";

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});
class DataService {
  static get(path = '',params = null) {
    return client({
      method: 'GET',
      url: path,
      params:params,
    });
  }
  static post(path = '', data = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
    });
  }
  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
    });
  }
  static delete(path = '', data = {}) {
    return client({
      method: 'DELETE',
      url: path,
      data: JSON.stringify(data),
    });
  }
  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data: JSON.stringify(data),
    });
  }
}
client.interceptors.request.use(config => {
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers,  Authorization: "Bearer "+getItem('token') };
  return requestConfig;
});
client.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // do something here
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  },
);
export { DataService };
