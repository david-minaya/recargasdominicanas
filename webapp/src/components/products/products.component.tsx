import React from 'react';
import { ProductItem, Title } from '@recargas-dominicanas/core/components';
import { style } from './products.module.css';
import { useProducts } from '@recargas-dominicanas/core/store';
import { IProduct } from '@recargas-dominicanas/core/types';

interface Props {
  onClick: (product: IProduct) => void;
}

export function Products(props: Props) {

  const { onClick } = props;

  const products = useProducts().get();
  const topups = products.filter(product => product.type === 'Recarga');
  const dataPlans = products.filter(product => product.type === 'Paquetico');
  const pins = products.filter(product => product.type === 'Pin');
  const invoices = products.filter(product => product.type === 'Factura');

  return (
    <div className={style.container}>
      <div className={style.content}>
        <Title style={style.title} title='Recargas'/>
        <div className={style.products}>
          {
            topups.map(product => (
              <ProductItem
                style={style.productItem}
                key={product.id}
                product={product}
                onClick={() => onClick(product)}/>
            ))
          }
        </div>
      </div>
      <div className={style.content}>
        <Title style={style.title} title='Paqueticos'/>
        <div className={style.products}>
          {
            dataPlans.map(product => (
              <ProductItem
                style={style.productItem}
                key={product.id}
                product={product}
                onClick={() => onClick(product)} />
            ))
          }
        </div>
      </div>
      <div className={style.content}>
        <Title style={style.title} title='Pines'/>
        <div className={style.products}>
          {
            pins.map(product => (
              <ProductItem
                style={style.productItem}
                key={product.id}
                product={product}
                onClick={() => onClick(product)} />
            ))
          }
        </div>
      </div>
      <div className={style.content}>
        <Title style={style.title} title='Servicios'/>
        <div className={style.products}>
          {
            invoices.map(product => (
              <ProductItem
                style={style.productItem}
                key={product.id}
                product={product}
                onClick={() => onClick(product)} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
