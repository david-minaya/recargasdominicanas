import React, { useEffect, useRef, useState } from 'react';
import { ProviderApi } from '@recargas-dominicanas/core/api';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { IProvider, ISaleByProduct, ISales } from '@recargas-dominicanas/core/types';
import { DatePicker } from '../../../components/date-picker/date-picker.component';
import { OptionButton } from '../../../components/option-button/option-button.component';
import { VerticalBarChart } from '../../../components/vertical-bar-chart/vertical-bar-chart.component';
import { SalesByProductChart } from '../../../components/sales-by-product-chart/sales-by-product-chart.component';
import { style } from './sales.module.css';

interface Props {
  provider: IProvider;
}

export function Sales(props: Props) {

  const { provider } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [optionDateLabel, setOptionDateLabel] = useState('Mes actual');
  const [date] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(date.getFullYear(), date.getMonth()));
  const [endDate, setEndDate] = useState(new Date(date.getFullYear(), date.getMonth() + 1));
  const [salesSummary, setSalesSummary] = useState<ISales>({ balance: 0, sales: 0, profit: 0 });
  const [sales, setSales] = useState<{ value: number, date: string }[]>([]);
  const [profits, setProfits] = useState<{ value: number, date: string }[]>([]);
  const [timeFormat, setTimeFormat] = useState<'day' | 'week' | 'month'>('day');
  const [xTicksCount, setXTicksCount] = useState(15);
  const [barWidth, setBarWidth] = useState(8);
  const [salesByProducts, setSalesByProducts] = useState<ISaleByProduct[]>([]);

  useEffect(() => {
    handleFetchData();
  }, []);

  async function handleFetchData() {

    const sales = timeFormat === 'day'
      ? await ProviderApi.getSalesByDay(provider.id, startDate, endDate)
      : await ProviderApi.getSalesByMonth(provider.id, startDate, endDate);

    setSalesSummary(await ProviderApi.getSales(provider.id, startDate, endDate));
    setSalesByProducts(await ProviderApi.getSalesByProduct(provider.id, startDate, endDate));
    setSales(sales.map(sale => ({ value: sale.sales,  date: sale.date })));
    setProfits(sales.map(sale => ({ value: sale.profit,  date: sale.date })));
  }

  async function handleDateChange(startDate: Date, endDate: Date, label: string, type: 'month' | 'year') {

    setStartDate(startDate);
    setEndDate(endDate);
    setOptionDateLabel(label);

    setSalesSummary(await ProviderApi.getSales(provider.id, startDate, endDate));
    setSalesByProducts(await ProviderApi.getSalesByProduct(provider.id, startDate, endDate));

    if (type === 'year') {
      const sales = await ProviderApi.getSalesByMonth(provider.id, startDate, endDate);
      setSales(sales.map(sale => ({ value: sale.sales,  date: sale.date })));
      setProfits(sales.map(sale => ({ value: sale.profit,  date: sale.date })));
      setTimeFormat('month');
      setXTicksCount(12);
      setBarWidth(16);
    }

    if (type === 'month') {
      const sales = await ProviderApi.getSalesByDay(provider.id, startDate, endDate);
      setSales(sales.map(sale => ({ value: sale.sales,  date: sale.date })));
      setProfits(sales.map(sale => ({ value: sale.profit,  date: sale.date })));
      setTimeFormat('day');
      setXTicksCount(15);
      setBarWidth(8);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.salesItems}>
          <div className={style.item}>
            <span className={style.title}>Balance</span>
            <span className={style.amount}>{formatCurrency(salesSummary.balance)}</span>
          </div>
          <div className={style.item}>
            <span className={style.title}>Ventas</span>
            <span className={style.amount}>{formatCurrency(salesSummary.sales)}</span>
          </div>
          <div className={style.item}>
            <span className={style.title}>Beneficio</span>
            <span className={style.amount}>{formatCurrency(salesSummary.profit)}</span>
          </div>
        </div>
        <div className={style.options}>
          <OptionButton
            icon='refresh' 
            title='Actualizar'
            onClick={handleFetchData}/>
          <OptionButton
            optionRef={menuRef}
            icon='event' 
            title={optionDateLabel}
            rightIcon='expand_more'
            onClick={() => setOpenMenu(open => !open)}/>
          <DatePicker
            anchor={menuRef}
            open={openMenu}
            onChange={handleDateChange}
            onClose={() => setOpenMenu(false)}/>
        </div>
      </div>
      <div className={style.content}>
        <SalesByProductChart
          title='Ventas por productos'
          products={salesByProducts}/>
        <div className={style.contentRight}>
          <VerticalBarChart
            className={style.verticalBarChart}
            title='Ventas'
            barWidth={barWidth}
            xTicksCount={xTicksCount}
            yTicksCount={3}
            timeFormat={timeFormat}
            data={sales}/>
          <VerticalBarChart
            className={style.verticalBarChart}
            title='Beneficios'
            barWidth={barWidth}
            xTicksCount={xTicksCount}
            yTicksCount={3}
            timeFormat={timeFormat}
            data={profits}/>
        </div>
      </div>
    </div>
  );
}
