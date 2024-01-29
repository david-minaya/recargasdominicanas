import { Api } from './api';
import { IProduct } from '../types';
import { formData } from '../utils/formData';

export class ProductsApi extends Api {

  public static async getProdutcs(query?: { name?: string, limit?: number }) {
    return this.get<IProduct[]>('/product', { params: query });
  }

  public static async add(product: any) {
    return this.post<IProduct>('/product', formData({
      name: product.name,
      type: product.type,
      profit: product.profit,
      min: product.min,
      max: product.max,
      image: product.image
    }));
  }

  public static async update(product: any) {
    return this.patch<IProduct>(`/product/${product.id}`, formData({
      name: product.name,
      type: product.type,
      profit: product.profit,
      min: product.min,
      max: product.max,
      image: product.image
    }));
  }

  public static async enable(id: number, enabled: boolean) {
    await this.patch(`/product/${id}`, { enabled });
  }

  static async addPin(pin: any) {
    return this.post<IProduct>('/product/pin', formData({
      name: pin.name,
      prices: pin.prices,
      instructions: pin.instructions,
      image: pin.image
    }));
  }

  static async updatePin(pin: any) {
    return this.patch<IProduct>(`/product/pin/${pin.id}`, formData({
      name: pin.name,
      prices: pin.prices,
      instructions: pin.instructions,
      image: pin.image
    }));
  }
}
