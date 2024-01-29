import React, { ReactNode } from 'react';
import { style } from './product-card-content.module.css';

interface Props {
  children: ReactNode;
}

export function ProductCardContent(props: Props) {
  return (
    <div className={style.container}>
      {props.children}
    </div>
  );
}
