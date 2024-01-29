import React from 'react';
import { Title } from '@recargas-dominicanas/core/components';
import { style } from './product-card-title.module.css';

interface Props {
  title: string;
}

export function ProductCardTitle(props: Props) {
  return (
    <Title 
      style={style.title} 
      title={props.title}/>
  );
}
