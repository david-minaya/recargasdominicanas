import React, { useEffect, useRef, useState } from 'react';
import { OptionButton } from '../../components/option-button/option-button.component';
import { VerticalBarChart } from '../../components/vertical-bar-chart/vertical-bar-chart.component';
import { HorizontalBarChart } from '../../components/horizontal-bar-chart/horizontal-bar-chart.component';
import { SalesByProductChart } from '../../components/sales-by-product-chart/sales-by-product-chart.component';
import { FinanceStore } from '../../store/financeStore';
import { CapitalChart } from './capital-chart/capital-chart.component';
import { FinanceItem } from './finance-item/finance-item.component';
import { DatePicker } from '../../components/date-picker/date-picker.component';
import { style } from './finances.module.css';

import { 
  PageContainer, 
  PageToolbar, 
  Title, 
  PageContent
} from '@recargas-dominicanas/core/components';

export function Finances() {
  
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [optionDateLabel, setOptionDateLabel] = useState('Mes actual');
  const [date] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(date.getFullYear(), date.getMonth()));
  const [endDate, setEndDate] = useState(new Date(date.getFullYear(), date.getMonth() + 1));

  const summary = FinanceStore.getSummary();
  const sales = FinanceStore.getSales();
  const profits = FinanceStore.getProfits();
  const salesByProducts = FinanceStore.getSalesByProduct();
  const timeFormat = FinanceStore.getTimeFormat();
  const tickCount = FinanceStore.getTickCount();
  const barWidth = FinanceStore.getBarWidth();

  useEffect(() => {
    FinanceStore.fetch();
  }, []);

  async function handleRefresh() {

    FinanceStore.fetchSummary(startDate, endDate);
    FinanceStore.fetchSalesByProduct(startDate, endDate);

    if (timeFormat === 'day') FinanceStore.fetchSalesByDay(startDate, endDate);
    if (timeFormat === 'month') FinanceStore.fetchSalesByMonth(startDate, endDate);
  }

  async function handleDateChange(startDate: Date, endDate: Date, label: string, type: 'month' | 'year') {

    setStartDate(startDate);
    setEndDate(endDate);
    setOptionDateLabel(label);

    FinanceStore.fetchSummary(startDate, endDate);
    FinanceStore.fetchSalesByProduct(startDate, endDate);
    
    if (type === 'year') FinanceStore.fetchSalesByMonth(startDate, endDate);
    if (type === 'month') FinanceStore.fetchSalesByDay(startDate, endDate);
  }

  if (!summary) return null;

  return (
    <PageContainer className={style.container}>
      <PageToolbar className={style.toolbar}>
        <Title
          style={style.title}
          title='Balance general'/>
        <div className={style.options}>
          <OptionButton 
            optionRef={menuRef}
            icon='refresh' 
            title='Actualizar'
            onClick={handleRefresh}/>
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
      </PageToolbar>
      <PageContent className={style.content}>
        <div className={style.financeItems}>
          <FinanceItem title='Balance'amount={summary.balance}/>
          <FinanceItem title='Cuentas bancarias'amount={summary.banksBalance}/>
          <FinanceItem title='Capital'amount={summary.capital}/>
          <FinanceItem title='Beneficio General'amount={summary.generalProfit}/>
          <FinanceItem title='Venta'amount={summary.sales}/>
          <FinanceItem title='Beneficio'amount={summary.profit}/>
        </div>
        <div className={style.charts}>
          <div className={style.chartColumn}>
            <CapitalChart
              balance={summary.balance}
              bankBalance={summary.banksBalance}
              profit={summary.generalProfit}
              capital={summary.capital}/>
            <HorizontalBarChart
              title='Balance'
              width={360}
              height={140}
              data={[
                { title: 'Balance', value: summary.balance, color: 'green' },
                { title: 'Balance asignado', value: summary.balanceAsigned, color: 'purple' }
              ]}/>
          </div>
          <div className={style.verticalBarCharts}>
            <VerticalBarChart
              className={style.verticalBarChart}
              title='Ventas'
              barWidth={barWidth}
              xTicksCount={tickCount}
              yTicksCount={3}
              timeFormat={timeFormat}
              data={sales}/>
            <VerticalBarChart
              className={style.verticalBarChart}
              title='Beneficios'
              barWidth={barWidth}
              xTicksCount={tickCount}
              yTicksCount={3}
              timeFormat={timeFormat}
              data={profits}/>
          </div>
          <div className={style.chartColumn}>
            <SalesByProductChart
              title='Ventas por productos'
              products={salesByProducts}/>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
