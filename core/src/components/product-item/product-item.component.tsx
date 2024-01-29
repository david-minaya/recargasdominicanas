import React from 'react';
import { IProduct } from '../../types';
import { Image } from '../image/image.component';
import { Text } from '../text/text.component';
import { Style, mergeStyle } from './product-item.module.css';

interface Props {
  product: IProduct;
  style?: Style;
  onClick?: (product: IProduct) => void;
}

export function ProductItem(props: Props) {

  const {
    product,
    style: customStyle,
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  function handleClick() {
    onClick?.(product);
  }

  return (
    <div 
      className={style.container}
      onClick={handleClick}>
      <Image className={style.image} src={product.image}/>
      <Text className={style.name} text={product.name}/>
    </div>
  );
}
