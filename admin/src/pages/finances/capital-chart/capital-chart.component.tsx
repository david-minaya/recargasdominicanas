import * as d3 from 'd3';
import React, { useMemo, useState } from 'react';
import { LegendItem } from '../../../components/legend-item/legend-item.component';
import { formatChartValue } from '../../../utils/formatChartValue';
import { style } from './capital-chart.module.css';

interface Props {
  capital: number;
  balance: number;
  bankBalance: number;
  profit: number;
}

export function CapitalChart(props: Props) {

  const {
    balance,
    bankBalance,
    profit,
    capital
  } = props;

  const [centerGroupHeight, setCenterGroupHeight] = useState(0);

  const width = 150;
  const height = 150;
  const radius = width / 2;

  const pie = useMemo(() => {
    return d3
      .pie<{ value: number, color: string }>()
      .value(d => d.value);
  }, []);

  const arcs = useMemo(() => {
    return pie([
      { value: balance, color: 'green' },
      { value: bankBalance, color: 'purple' },
      { value: profit, color: 'blue' }
    ]);
  }, [pie, balance, bankBalance, profit]);

  const arc = useMemo(() => {
    return d3
      .arc<d3.PieArcDatum<{ value: number, color: string }>>()
      .innerRadius(radius * 0.55)
      .outerRadius(radius);
  }, [radius]);

  return (
    <div className={style.container}>
      <div className={style.title}>Capital</div>
      <svg
        className={style.chart}
        width={width} 
        height={height}
        viewBox={`-${width/2} -${height/2} ${width} ${height}`}>
        <g 
          ref={e => setCenterGroupHeight(e?.getBoundingClientRect().height || 0)}
          transform={`translate(0, -${centerGroupHeight/2})`}>
          <text 
            className={style.capitalTitle}
            textAnchor='middle'
            alignmentBaseline='text-before-edge'>
            Total
          </text>
          <text 
            className={style.capital}
            y={18}
            textAnchor='middle'
            alignmentBaseline='text-before-edge'>
            {formatChartValue(capital)}
          </text>
        </g>
        <g>
          {
            arcs.map(value => (
              <path
                className={style[value.data.color]}
                key={value.index}
                d={arc(value) || ''}/>
            ))
          }
        </g>
      </svg>
      <div className={style.legend}>
        <LegendItem color='green' title='Balance:' amount={balance}/>
        <LegendItem color='blue' title='Beneficio:' amount={profit}/>
        <LegendItem color='purple' title='Cuentas bancarias:' amount={bankBalance}/>
      </div>
    </div>
  );
}
