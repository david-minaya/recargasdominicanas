import React, { ReactNode } from 'react';
import { style } from './product-card-fields.module.css';

interface Props {
  children: ReactNode;
}

export function ProductCardFields(props: Props) {
  return (
    <div className={style.container}>
      {props.children}
    </div>
  );
}
