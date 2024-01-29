import { IProduct } from '@recargas-dominicanas/core/types';
import { ProductsApi } from '@recargas-dominicanas/core/api';
import { BaseStore } from './BaseStore';

interface ProductState {
  id: number;
  product: IProduct;
}

export class Store extends BaseStore<ProductState> {
  
  constructor() {
    super('productsState');
  }

  getAll() {
    return this.findAll('product');
  }

  getTopups() {
    return this.getAll().filter(product => product.type === 'Recarga');
  }

  getDataPlans() {
    return this.getAll().filter(product => product.type === 'Paquetico');
  }

  getPins() {
    return this.getAll().filter(product => product.type === 'Pin');
  }

  getInvoices() {
    return this.getAll().filter(product => product.type === 'Factura');
  }

  async fetchAll() {
    const products = await ProductsApi.getProdutcs();
    this.set(products.map(product => ({ id: product.id, 'product': product })));
  }
}

export const ProductStore = new Store();
