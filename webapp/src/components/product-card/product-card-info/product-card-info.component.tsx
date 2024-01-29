import React from 'react';
import { IProduct } from '@recargas-dominicanas/core/types';
import { Title, Image } from '@recargas-dominicanas/core/components';
import { style } from './product-card-info.module.css';

interface Props {
  product: IProduct;
}

export function ProductCardInfo(props: Props) {

  const {
    product
  } = props;

  return (
    <div className={style.container}>
      <Image 
        className={style.image} 
        src={product.image}/>
      <Title 
        style={style.title} 
        title={product.name}/>
    </div>
  );
}
