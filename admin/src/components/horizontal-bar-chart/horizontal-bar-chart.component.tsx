import * as d3 from 'd3';
import React, { useEffect, useMemo, useRef } from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { formatChartValue } from '../../utils/formatChartValue';
import { useRect } from '../../hooks/useRect';
import { style } from './horizontal-bar-chart.module.css';

interface DataItem {
  title: string;
  value: number;
  color: 'green' | 'blue' | 'purple' | 'orange';
}

interface Props {
  title: string;
  width: number;
  height: number;
  data: DataItem[];
}

export function HorizontalBarChart(props: Props) {

  const { 
    title,
    width,
    height,
    data 
  } = props;
  
  const svgRef = useRef<SVGSVGElement>(null);

  const container = useRect({ width, height, padding: { left: 4 } });
  const tickText = useRect({ margin: { top: 12 } });
  const lastTickText = useRect(); 
  const barContainer = useRect();
  const barRect = useRect({ height: 20, margin: { top: 20 } });
  const barValue = useRect({ margin: { top: 20, left: 12 } });

  const deps = data.map(d => d.value + d.title).toString();
  const values = data.map(d => d.value);
  const xAxisStart = container.padding.left;
  const xAxisEnd = container.width - (lastTickText.width / 2) - container.padding.right;
  const yAxisStart = container.padding.top;
  const yAxisEnd = container.height - tickText.height - tickText.margin.top - barContainer.height;

  const max = useMemo(() => d3.max(values)!, [deps]);
  const x = useMemo(() => d3.scaleLinear([0, max], [xAxisStart, xAxisEnd]), [max, xAxisStart, xAxisEnd]);
  const y = useMemo(() => d3.scalePoint(values, [yAxisStart, yAxisEnd]), [deps, yAxisStart, yAxisEnd]);
  const ticks = useMemo(() => x.nice(3).ticks(3), [x]);

  useEffect(() => {

    if (!svgRef.current) return;

    const tickTextElement = svgRef.current.querySelector<SVGTextElement>(`.${style.tickText}`);
    const barContainerElement = svgRef.current.querySelector<SVGGElement>('.bar-container');
    const barValueElement = svgRef.current.querySelector<SVGTextElement>(`.${style.barText}`);

    tickText.setHeight(tickTextElement?.getBBox().height || 0);
    barContainer.setHeight(barContainerElement?.getBBox().height || 0);
    barValue.setHeight(barValueElement?.getBBox().height || 0);
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      const tickTextsElements = svgRef.current.querySelectorAll<SVGTextElement>(`.${style.tickText}`);
      lastTickText.setWidth(tickTextsElements[tickTextsElements.length - 1].getBBox().width || 0);
    }
  }, [max]);

  useEffect(() => {

    if (!svgRef.current) return;

    const barContainers = svgRef.current.querySelectorAll<SVGGElement>('.bar-container');
    const rects = Array.from(barContainers).map(barContainer => barContainer.getBBox());
    const max = rects.reduce((prev, next) => prev.width > next.width ? prev : next);

    if (max.x + max.width > container.width) {
      container.setPaddingRight((max.x + max.width) - container.width);
    }
  }, [container.width, deps]);

  function centerBarValue(y: number) {
    const result = barValue.height > 0 ? (barRect.height - barValue.height) / 2 : 0;
    return y + result;
  }

  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <svg
        className={style.chart}
        width={container.width} 
        height={container.height}
        ref={svgRef}>
        <g>
          {ticks.map(tick => 
            <g key={tick}>
              <line
                className={style.line}
                x1={x(tick)} 
                x2={x(tick)} 
                y1={container.padding.top} 
                y2={container.height - tickText.height - tickText.margin.top}/>
              <text
                className={style.tickText}
                x={x(tick)} 
                y={container.height}
                alignmentBaseline='text-after-edge'>
                {formatChartValue(tick)}
              </text>
            </g>
          )}
        </g>
        <g>
          {data.map(d => 
            <g 
              key={d.value + d.title}
              className='bar-container'>
              <text
                className={style.barText}
                x={container.padding.left} 
                y={y(d.value)}
                alignmentBaseline='text-before-edge'>
                {d.title}
              </text>
              <rect
                className={style[d.color]}
                x={container.padding.left}
                y={y(d.value)! + barRect.margin.top}
                width={x(d.value) - x(0)}
                height={barRect.height}/>
              <text
                className={style.barText}
                x={(x(d.value) - x(0)) + barValue.margin.left} 
                y={centerBarValue(y(d.value)! + barValue.margin.top)}
                alignmentBaseline='text-before-edge'>
                {formatCurrency(d.value)}
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
