import React from 'react';
import { ProductItem } from '@recargas-dominicanas/core/components';
import { IProduct } from '@recargas-dominicanas/core/types';
import { style } from './products.module.css';

interface Props {
  id?: string;
  title: string;
  products: IProduct[];
  onProductClick: (product: IProduct) => void;
}

export function Products(props: Props) {

  const {
    id,
    title,
    products,
    onProductClick
  } = props;

  return (
    <div id={id}>
      <div
        className={style.title}>
        {title}
      </div>
      <div className={style.products}>
        {
          products.map(product => (
            <ProductItem
              style={style.productItem}
              key={product.id}
              product={product}
              onClick={onProductClick}/>
          ))
        }
      </div>
    </div>
  );
}
