import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class Api {
  
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:2000',
      withCredentials: true
    });
  }

  setCookie(cookie: string) {
    this.api.defaults.headers.cookie = cookie;
  }

  clearCookie() {
    delete this.api.defaults.headers.cookie;
  }

  getCookie() {
    return this.api.defaults.headers.cookie;
  }

  async get<R>(route: string, config?: AxiosRequestConfig) {
    return this.api.get<R>(route, config);
  }

  async post<R>(route: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.post<R>(route, data, config);
  }

  async patch<R>(route: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.patch<R>(route, data, config);
  }

  async remove<R>(route: string, config?: AxiosRequestConfig) {
    return this.api.delete<R>(route, config);
  }
}

export default new Api();
