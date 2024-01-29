import axios, { AxiosRequestConfig } from 'axios';

export class Api {

  protected static get api() {
    return axios.create({
      baseURL: process.env.API,
      withCredentials: true
    });
  }

  protected static async get<R>(route: string, config?: AxiosRequestConfig) {
    const response = await this.api.get<R>(route, config);
    return response.data;
  }

  protected static async post<R>(route: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.api.post<R>(route, data, config);
    return response.data;
  }

  protected static async patch<R>(route: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.api.patch<R>(route, data, config);
    return response.data;
  }

  protected static async remove<R>(route: string, config?: AxiosRequestConfig) {
    const response = await this.api.delete<R>(route, config);
    return response.data;
  }
}
