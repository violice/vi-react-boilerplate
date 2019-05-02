import Axios from 'axios';

const baseUrl = BASE_API_PATH; //eslint-disable-line

const createStringParams = (params = {}) => {
  if (Object.keys(params).length === 0) {
    return '';
  }
  const stringParams = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return `?${stringParams}`;
};

const makeConfig = (type = 'application/json') => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': type,
      'x-access-token': token,
    },
  };
};

const throwError = (response) => {
  if (response) {
    const { status, data: { error, message } } = response;
    const err = { code: status, message: error || message };
    throw err;
  }
  const err = { message: 'Server unavailable' };
  throw err;
};

export default {
  get: async (url, params) => {
    try {
      const { data } = await Axios.get(`${baseUrl}/${url}${createStringParams(params)}`, makeConfig());
      return data;
    } catch ({ response }) {
      return throwError(response);
    }
  },
  post: async (url, body) => {
    try {
      const { data } = await Axios.post(`${baseUrl}/${url}`, body, makeConfig());
      return data;
    } catch ({ response }) {
      return throwError(response);
    }
  },
  patch: async (url, body) => {
    try {
      const { data } = await Axios.patch(`${baseUrl}/${url}`, body, makeConfig());
      return data;
    } catch ({ response }) {
      return throwError(response);
    }
  },
  delete: async (url) => {
    try {
      const { data } = await Axios.delete(`${baseUrl}/${url}`, makeConfig());
      return data;
    } catch ({ response }) {
      return throwError(response);
    }
  },
};
