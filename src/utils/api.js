import axios from 'axios';

const baseUrl = BASE_API_PATH; //eslint-disable-line

export default class Api {
  static createStringParams(params = {}) {
    if (Object.keys(params).length === 0) {
      return '';
    }
    const stringParams = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    return `?${stringParams}`;
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

  static async get(
    url,
    params,
  ) {
    try {
      const { data } = await axios.get(`${baseUrl}/${url}${Api.createStringParams(params)}`, Api.makeConfig());
      return data;
    } catch ({ response }) {
      if (response) {
        const { status, data: { error, message } } = response;
        throw { code: status, message: error || message };
      }
      throw { message: 'Сервер недоступен' };
    }
  }

  static async post(
    url,
    body,
  ) {
    try {
      const { data } = await axios.post(`${baseUrl}/${url}`, body, Api.makeConfig());
      return data;
    } catch ({ response }) {
      if (response) {
        const { status, data: { error, message } } = response;
        throw { code: status, message: error || message };
      }
      throw { message: 'Сервер недоступен' };
    }
  }

  static async patch(
    url,
    body,
  ) {
    try {
      const { data } = await axios.patch(`${baseUrl}/${url}`, body, Api.makeConfig());
      return data;
    } catch ({ response }) {
      if (response) {
        const { status, data: { error, message } } = response;
        throw { code: status, message: error || message };
      }
      throw { message: 'Сервер недоступен' };
    }
  }

  static async delete(
    url,
    id,
  ) {
    try {
      const { data } = await axios.delete(`${baseUrl}/${url}/${id}`, Api.makeConfig());
      return data;
    } catch ({ response }) {
      if (response) {
        const { status, data: { error, message } } = response;
        throw { code: status, message: error || message };
      }
      throw { message: 'Сервер недоступен' };
    }
  }
}
