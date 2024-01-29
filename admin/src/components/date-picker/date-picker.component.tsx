import React, { useEffect, useState, RefObject } from 'react';
import { Menu, Select, SelectOption } from '@recargas-dominicanas/core/components';
import { MenuOption } from '../menu-option/menu-option.component';
import { style } from './date-picker.module.css';

const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

interface Month {
  date: Date;
  name: string;
  year: number;
}

interface Props {
  open: boolean;
  anchor: RefObject<HTMLDivElement>;
  onClose: () => void;
  onChange: (startDate: Date, endDate: Date, label: string, type: 'month' | 'year') => void;
}

export function DatePicker(props: Props) {

  const { 
    open,
    anchor,
    onClose,
    onChange
  } = props;

  const [date] = useState(new Date());
  const [month, setMonth] = useState<Month>();
  const [months, setMonths] = useState<Month[]>([]);
  const [year, setYear] = useState<number>();
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {

    const date = new Date();
    const startDate = new Date(date.getFullYear() - 1, date.getMonth());
    const months = [];

    for (let i = 12; i >= 1; i--) {

      const date = new Date(startDate.getFullYear(), startDate.getMonth() + i);

      months.push({ 
        date: date,
        name: monthNames[date.getMonth()],
        year: date.getFullYear()
      });
    }

    setMonths(months);
  }, []);

  useEffect(() => {

    const currentYear = new Date().getFullYear();
    const years = [];

    for (let i = 2022; i <= currentYear; i++) {
      years.unshift(i);
    }

    setYears(years);
  }, []);

  function handleCurrentMonth() {
    const startDate = new Date(date.getFullYear(), date.getMonth());
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1);
    setMonth(undefined);
    setYear(undefined);
    onChange(startDate, endDate, 'Mes actual', 'month');
    onClose();
  }

  function handleLastMonth() {
    const startDate = new Date(date.getFullYear(), date.getMonth() -1);
    const endDate = new Date(date.getFullYear(), date.getMonth());
    setMonth(undefined);
    setYear(undefined);
    onChange(startDate, endDate, 'Mes anterior', 'month');
    onClose();
  }

  function handleMonthSelectChange(month?: Month) {
    if (month) {
      const startDate = new Date(month.date.getFullYear(), month.date.getMonth());
      const endDate = new Date(month.date.getFullYear(), month.date.getMonth() + 1);
      const label = `${month.name} ${month.year}`;
      setMonth(month);
      setYear(undefined);
      onChange(startDate, endDate, label, 'month');
      onClose();
    }
  }

  function handleCurrentYear() {
    const startDate = new Date(date.getFullYear(), 0);
    const endDate = new Date(date.getFullYear() + 1, 0);
    setMonth(undefined);
    setYear(undefined);
    onChange(startDate, endDate, 'Año actual', 'year');
    onClose();
  }

  function handleLastYear() {
    const startDate = new Date(date.getFullYear() - 1, date.getMonth());
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1);
    setMonth(undefined);
    setYear(undefined);
    onChange(startDate, endDate, 'Ultimo año', 'year');
    onClose();
  }

  function handleYearSelectChange(year?: number) {
    if (year) {
      const startDate = new Date(year, 0);
      const endDate = new Date(year + 1, 0);
      setMonth(undefined);
      setYear(year);
      onChange(startDate, endDate, `Año ${year.toString()}`, 'year');
      onClose();
    }
  }

  return (
    <Menu 
      style={style.menu}
      open={open}
      anchor={anchor}
      top={8}>
      <div className={style.title}>Mensual</div>
      <MenuOption 
        style={style.menuOption} 
        text='Mes actual'
        onClick={handleCurrentMonth}/>
      <MenuOption 
        style={style.menuOption} 
        text='Mes anterior'
        onClick={handleLastMonth}/>
      <Select
        style={style.select}
        value={month}
        valueTitle={month ? `${month.name} ${month.year}` : undefined}
        placeholder='Seleccionar mes'
        onChange={handleMonthSelectChange}>
        {
          months.map(month => 
            <SelectOption
              key={month.name}
              style={style.selectOption} 
              value={month}
              label={`${month.name} ${month.year}`}
              showClearIcon={false}>
              <span>{month.name}</span>
              <span>{month.year}</span>
            </SelectOption>
          )
        }
      </Select>
      <div className={style.title}>Anual</div>
      <MenuOption 
        style={style.menuOption} 
        text='Ultimo año'
        onClick={handleLastYear}/>
      <MenuOption 
        style={style.menuOption} 
        text='Año actual'
        onClick={handleCurrentYear}/>
      <Select
        style={style.select}
        value={year}
        valueTitle={year ? `Año ${year}` : undefined}
        placeholder='Seleccionar año'
        onChange={handleYearSelectChange}>
        {
          years.map(year => 
            <SelectOption
              key={year}
              style={style.selectOption} 
              value={year}
              label={`Año ${year}`}
              showClearIcon={false}>
              {year}
            </SelectOption>
          )
        }
      </Select>
    </Menu>
  );
}
