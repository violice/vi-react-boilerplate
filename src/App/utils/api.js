import axios from 'axios';

const axiosClient = axios.create({
  baseURL: BASE_API_PATH, //eslint-disable-line
  withCredentials: true,
});

export default class Api {
  static createStringParams(params) {
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
  }

  static makeConfig(type = 'application/json') {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Content-Type': type,
        'x-access-token': token,
      },
    };
  }

  static async get({
    controller,
    action,
    params = {},
  }) {
    if (!controller) {
      return null;
    }
    const path = [`/api/${controller}`];
    if (action) {
      path.push(`/${action}`);
    }
    if (Object.keys(params).length !== 0) {
      path.push(`?${Api.createStringParams(params)}`);
    }
    try {
      const { data } = await axiosClient.get(path.join(''), Api.makeConfig());
      return data;
    } catch ({ response }) {
      if (response) {
        const { status, data: { error, message } } = response;
        throw { code: status, message: error || message };
      }
      throw { message: 'The server is not available' };
    }
  }

  static async post({
    controller,
    action,
    body = {},
    params = {},
  }) {
    const path = [`/api/${controller}`];
    if (action) {
      path.push(`/${action}`);
    }
    if (Object.keys(params).length !== 0) {
      path.push(`?${Api.createStringParams(params)}`);
    }
    try {
      const { data } = await axiosClient.post(path.join(''), body, Api.makeConfig());
      return data;
    } catch ({ response }) {
      if (response) {
        const { status, data: { error, message } } = response;
        throw { code: status, message: error || message };
      }
      throw { message: 'The server is not available' };
    }
  }

  static async patch({
    controller,
    action,
    body = {},
    params = {},
  }) {
    const path = [`/api/${controller}`];
    if (action) {
      path.push(`/${action}`);
    }
    if (Object.keys(params).length !== 0) {
      path.push(`?${Api.createStringParams(params)}`);
    }
    try {
      const { data } = await axiosClient.patch(path.join(''), body, Api.makeConfig());
      return data;
    } catch ({ response }) {
      if (response) {
        const { status, data: { error, message } } = response;
        throw { code: status, message: error || message };
      }
      throw { message: 'The server is not available' };
    }
  }

  static async delete({
    controller,
    action,
    id,
  }) {
    if (!controller) {
      return null;
    }
    const path = [`/api/${controller}`];
    if (action) {
      path.push(`/${action}`);
    }
    try {
      const { data } = await axiosClient.delete(`${path.join('')}/${id}`, Api.makeConfig());
      return data;
    } catch ({ response }) {
      if (response) {
        const { status, data: { error, message } } = response;
        throw { code: status, message: error || message };
      }
      throw { message: 'The server is not available' };
    }
  }
}
