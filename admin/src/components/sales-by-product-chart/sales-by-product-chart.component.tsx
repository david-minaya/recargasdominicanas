import * as d3 from 'd3';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { formatChartValue } from '../../utils/formatChartValue';
import { useRect } from '../../hooks/useRect';
import { style } from './sales-by-product-chart.module.css';
import { ISaleByProduct } from '@recargas-dominicanas/core/types';
import { LegendItem } from '../legend-item/legend-item.component';
import { SalesByProductItem } from '../sales-by-product-item/sales-by-product-item.component';

interface Props {
  title: string;
  products: ISaleByProduct[];
}

export function SalesByProductChart(props: Props) {

  const { 
    title,
    products  = []
  } = props;

  const [resize, setResize] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const svgTicksRef = useRef<SVGSVGElement>(null);
  const deps = products.map(product => product.id + product.total).toString();

  const container = useRect({ padding: { left: 4 } });
  const tickText = useRect({ margin: { top: 12 } });
  const lastTickText = useRect();
  const productName = useRect({ margin: { right: 12 } });
  const bar = useRect({ height: 20, margin: { top: 16 } });
  
  const xAxisStart = container.padding.left + productName.width + productName.margin.right;
  const xAxisEnd = container.width - (lastTickText.width / 2);
  const yAxisStart = container.padding.top + (bar.height / 2);
  const yAxisEnd = container.height - (bar.height / 2);

  const max = useMemo(() => d3.max(products, product => product.total)!, [deps]);
  const ids = useMemo(() => d3.map(products, product => product.id), [deps]);
  const x = useMemo(() => d3.scaleLinear([0, max], [xAxisStart, xAxisEnd]), [max, xAxisStart, xAxisEnd]);
  const y = useMemo(() => d3.scalePoint(ids, [yAxisStart, yAxisEnd]), [deps, yAxisStart, yAxisEnd]);
  const xTicks = useMemo(() => x.nice(3).ticks(3), [x]);

  useEffect(() => {
    const onResize = () => setResize(window.innerWidth + window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const rect = contentRef.current!.getBoundingClientRect();
    container.setWidth(rect.width - 10);
    container.setHeight(Math.max(rect.height, products.length * (bar.height + bar.margin.top)));
  }, [deps, resize]);

  useEffect(() => {
    if (products.length > 0 && container.width && container.height) {
      const tickTextElements = svgTicksRef.current!.querySelectorAll<SVGTextElement>(`.${style.tickText}`);
      const productNameElements = svgRef.current!.querySelectorAll<SVGTextElement>(`.${style.productName}`);
      const productNameRects = Array.from(productNameElements).map(element => element.getBBox());
      const maxProductNameRect = productNameRects.reduce((prev, next) => prev.width > next.width ? prev : next);
      tickText.setHeight(tickTextElements[0]?.getBBox().height || 0);
      lastTickText.setWidth(tickTextElements[tickTextElements.length - 1]?.getBBox().width || 0);
      productName.setWidth(maxProductNameRect.width || 0);
    }
  }, [deps, container.width, container.height]);

  function colors(type: string) {
    switch (type) {
      case 'Recarga': return 'green';
      case 'Paquetico': return 'blue';
      case 'Pin': return 'purple';
      case 'Factura': return 'orange';
      default: throw 'error';
    }
  }

  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <div
        ref={contentRef} 
        className={style.content}>
        <svg
          className={style.chart}
          height={container.height}
          ref={svgRef}>
          <g>
            {xTicks.map(tick =>
              <line
                key={tick}
                className={style.line}
                x1={x(tick)} 
                x2={x(tick)} 
                y1={container.padding.top} 
                y2={container.height}/>
            )}
          </g>
          <g>
            {products.map(product => 
              <text
                key={product.id}
                className={style.productName}
                x={container.padding.left + productName.width} 
                y={y(product.id)}
                textAnchor='end'
                alignmentBaseline='middle'>
                {product.name}
              </text>
            )}
          </g>
          <g>
            {container.width && container.height && products.map(product => 
              <SalesByProductItem
                key={product.id}
                className={style[colors(product.type)]}
                product={product}
                height={bar.height}
                x={x}
                y={y}/>
            )}
          </g>
        </svg>
      </div>
      <svg
        className={style.ticks}
        height={16}
        ref={svgTicksRef}>
        {xTicks.map(tick =>
          <text
            key={tick}
            className={style.tickText}
            x={x(tick)} 
            y={16}
            alignmentBaseline='text-after-edge'>
            {formatChartValue(tick)}
          </text>
        )}
      </svg>
      <div className={style.legend}> 
        <LegendItem title='Recargas' color='green'/>
        <LegendItem title='Paqueticos' color='blue'/>
        <LegendItem title='Pines' color='purple'/>
        <LegendItem title='Facturas' color='orange'/>
      </div>
    </div>
  );
}
