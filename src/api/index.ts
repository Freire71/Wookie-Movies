import axios, { AxiosRequestConfig } from 'axios';

const API_TOKEN = 'Bearer Wookie2019';
export const API_BASE_URL = 'https://wookie.codesubmit.io';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: 'Request Timeout',
  responseType: 'json',
});

export const get = async <T>(route: string) => {
  const requestConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `${API_TOKEN}`,
    },
  };
  return api.get<T>(route, requestConfig);
};

export default api;
