import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export class Api {

  protected api: AxiosInstance;

  constructor(url: string) {
    this.api =  axios.create({
      baseURL: `${process.env.API}${url}`,
      withCredentials: true
    });
  }

  protected async get<R>(route: string, config?: AxiosRequestConfig) {
    const response = await this.api.get<R>(route, config);
    return response.data;
  }

  protected async post<R>(route: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.api.post<R>(route, data, config);
    return response.data;
  }

  protected async patch<R>(route: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.api.patch<R>(route, data, config);
    return response.data;
  }

  protected async remove<R>(route: string, config?: AxiosRequestConfig) {
    const response = await this.api.delete<R>(route, config);
    return response.data;
  }
}
