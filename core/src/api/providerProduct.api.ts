import { Api } from './api';
import { IProviderProduct } from '../types/providerProduct.type';

export class ProviderProductApi extends Api {

  static async add(providerProduct: any) {
    return this.post<IProviderProduct>('/provider-product', providerProduct);
  }

  static async update(id: number, providerProduct: any) {
    return this.patch<IProviderProduct>(`/provider-product/${id}`, providerProduct);
  }

  static async delete(id: number) {
    await this.remove(`/provider-product/${id}`);
  }
}
