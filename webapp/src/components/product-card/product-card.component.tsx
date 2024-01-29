import React, { ReactNode } from 'react';
import { style } from './product-card.module.css';

interface Props {
  children: ReactNode;
}

export function ProductCard(props: Props) {

  const { children } = props;

  return (
    <div className={style.container}>
      {children}
    </div>
  );
}
