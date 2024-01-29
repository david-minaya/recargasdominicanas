import * as d3 from 'd3';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { formatChartValue } from '../../utils/formatChartValue';
import { useRect } from '../../hooks/useRect';
import { style } from './vertical-bar-chart.module.css';
import { formatCurrency } from '@recargas-dominicanas/core/utils';

const locale = d3.timeFormatLocale({
  dateTime: '%A, %e de %B de %Y, %X',
  date: '%d/%m/%Y',
  time: '%H:%M:%S',
  periods: ['am', 'pm'],
  days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  shortDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Fue', 'Vie', 'Sáb'],
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
});

interface DataItem {
  value: number;
  date: string;
}

interface Props {
  title: string;
  barWidth?: number;
  className?: string;
  xTicksCount: number;
  yTicksCount: number;
  timeFormat?: 'day' | 'week' | 'month'
  data?: DataItem[];
}

export function VerticalBarChart(props: Props) {

  const { 
    title,
    barWidth = 16,
    className,
    xTicksCount,
    yTicksCount,
    timeFormat = 'week',
    data = []
  } = props;

  const [resize, setResize] = useState(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const deps = data.map(d => d.date + d.value).toString();

  const container = useRect({ padding: { left: 0, top: 20, right: 4 } });
  const tickText = useRect();
  const tickLine = useRect({ margin: { left: 20 } });
  const barRect = useRect({ width: barWidth, margin: { bottom: 20 } });
  const barTitle = useRect();
  const barValue = useRect({ margin: { bottom: 8 } });

  const xAxisStart = container.padding.left + tickText.width + tickLine.margin.left + (barRect.width / 2);
  const xAxisEnd = container.width - container.padding.right - (barRect.width / 2);
  const yAxisStart = container.padding.top;
  const yAxisEnd = container.height - barTitle.height - barRect.margin.bottom;

  const startDate = new Date(data[0]?.date);
  const endDate = new Date(data[data.length - 1]?.date);

  const max = useMemo(() => d3.max(data, d => d.value)!, [deps]);
  const x = useMemo(() => d3.scaleTime([startDate, endDate], [xAxisStart, xAxisEnd]), [deps, xAxisStart, xAxisEnd]);
  const y = useMemo(() => d3.scaleLinear([max, 0], [yAxisStart, yAxisEnd]), [max, yAxisStart, yAxisEnd]);
  const xTicks = useMemo(() => x.ticks(xTicksCount), [x, xTicksCount]);
  const yTicks = useMemo(() => y.nice(yTicksCount).ticks(yTicksCount), [y, yTicksCount]);

  useEffect(() => {
    const onResize = () => setResize(window.innerWidth + window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const rect = svgRef.current!.getBoundingClientRect();
    container.setWidth(rect.width);
    container.setHeight(rect.height);
  }, [resize]);

  useEffect(() => {
    if (container.width && container.height) {
      const tickTextElement = svgRef.current!.querySelector<SVGTextElement>(`.${style.tickText}`);
      const barTitleElement = svgRef.current!.querySelector<SVGTextElement>(`.${style.barTitle}`);
      tickText.setWidth(tickTextElement?.getBBox().width || 0);
      barTitle.setHeight(barTitleElement?.getBBox().height || 0);
    }
  }, [deps, container.width, container.height]);

  function formatDate(date: Date) {
    if (timeFormat === 'day') return locale.format('%-d')(date);
    if (timeFormat === 'week') return locale.format('%b %-d')(date);
    if (timeFormat === 'month') return locale.format('%b')(date);
  }

  return (
    <div className={clsx(style.container, className)}>
      <div className={style.title}>{title}</div>
      <svg
        className={style.chart}
        ref={svgRef}>
        <g>
          {xTicks.map(tick =>
            <text
              key={tick.toString()}
              className={style.barTitle}
              x={x(tick)} 
              y={container.height}
              alignmentBaseline='text-after-edge'>
              {formatDate(tick)}
            </text>
          )}
        </g>
        <g>
          {yTicks.map(tick => 
            <g key={tick}>
              <text
                className={style.tickText}
                x={container.padding.left + tickText.width} 
                y={y(tick)}
                alignmentBaseline='middle'>
                {formatChartValue(tick)}
              </text>
              <line
                className={style.line}
                x1={container.padding.left + tickText.width + tickLine.margin.left} 
                x2={container.width - container.padding.right} 
                y1={y(tick)} 
                y2={y(tick)}/>
            </g>
          )}
        </g>
        <g>
          {container.width && container.height && data.map(d =>
            <g 
              key={d.date}
              className={style.barContainer}>
              {d.value > 0 &&
                <text
                  className={style.value}
                  x={x(new Date(d.date))} 
                  y={y(d.value) - barValue.margin.bottom}
                  textAnchor='middle'
                  alignmentBaseline='text-after-edge'>
                  {formatCurrency(d.value)}
                </text>
              }
              <rect
                key={d.date}
                className={style.rect}
                x={x(new Date(d.date))! - (barRect.width / 2)}
                y={y(d.value)}
                width={barRect.width}
                height={y(0) - y(d.value)}/>  
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
