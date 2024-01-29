import React, { useEffect, useRef } from 'react';
import { useRect } from '../../hooks/useRect';
import { ISaleByProduct } from '@recargas-dominicanas/core/types';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { style } from './sales-by-product-item.module.css';

interface Props {
  className: string;
  product: ISaleByProduct;
  height: number;
  x: (value: number) => number;
  y: (value: number) => number | undefined;
}

export function SalesByProductItem(props: Props) {

  const {
    className,
    product,
    height,
    x,
    y
  } = props;

  const barRef = useRef<SVGRectElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  const barRect = useRect({ height });
  const textRect = useRect({ margin: { left: 4, right: 4 } });

  useEffect(() => {
    const rect = barRef.current!.getBoundingClientRect();
    const text = textRef.current!.getBoundingClientRect();
    barRect.setWidth(rect.width);
    textRect.setWidth(text.width);
  }, [product.total, x]);

  function calcTextX(x: number) {
    return (textRect.margin.left + textRect.width + textRect.margin.right) >= barRect.width
      ? x + textRect.margin.left
      : x - textRect.width - textRect.margin.right;
  }

  return (
    <g>
      <rect
        className={className}
        ref={barRef}
        x={x(0)}
        y={y(product.id)! - (barRect.height / 2)}
        width={x(product.total) - x(0)}
        height={barRect.height}/>
      <text
        className={style.text}
        ref={textRef}
        x={calcTextX(x(product.total))}
        y={y(product.id)}
        alignmentBaseline='central'>
        {formatCurrency(product.total)}
      </text>
    </g>
  );
}
