import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Icon } from '../icon/icon.component';
import { Select } from '../select/select.component';
import { SelectOption } from '../select-option/select-option.component';
import { Style, mergeStyle } from './pagination.module.css';

interface Props {
  count: number;
  index: number;
  size: number;
  pages: number;
  title: string;
  style?: Style;
  onChange: (page: number, size: number) => void;
}

export function Pagination(props: Props) {

  const {
    index,
    size: initialSize,
    count,
    pages,
    title,
    style: customStyle,
    onChange
  } = props;

  const style = mergeStyle(customStyle);
  const [lastIndex, setLastIndex] = useState<number>();
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    setSize(initialSize);
  }, [initialSize]);

  function handlePrevious() {
    if (index >= 2 && lastIndex !== index) {
      setLastIndex(index);
      onChange(index - 1, size);
    }
  }

  function handleNext() {
    if (index < pages && lastIndex !== index) {
      setLastIndex(index);
      onChange(index + 1, size);
    }
  }

  function handleSize(value?: number) {
    setSize(value!);
    setLastIndex(undefined);
    onChange(1, value!);
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.count}>{count} {title}</div>
        <div className={style.size}>
          <div>Cantidad</div>
          <Select 
            style={style.select}
            value={size}
            valueTitle={size.toString()}
            onChange={handleSize}>
            <SelectOption style={style.selectOption} label='10' value={10} showClearIcon={false}>10</SelectOption>
            <SelectOption style={style.selectOption} label='25' value={25} showClearIcon={false}>25</SelectOption>
            <SelectOption style={style.selectOption} label='50' value={50} showClearIcon={false}>50</SelectOption>
            <SelectOption style={style.selectOption} label='100' value={100} showClearIcon={false}>100</SelectOption>
            <SelectOption style={style.selectOption} label='1000' value={1000} showClearIcon={false}>1000</SelectOption>
          </Select>
        </div>
        <div className={style.page}>
          <div>Página</div>
          <Icon
            className={clsx(style.icon, index === 1 && style.iconDisabled)} 
            icon='navigate_before'
            onClick={handlePrevious}/>
          <div>{index}</div>
          <Icon
            className={clsx(style.icon, index === pages && style.iconDisabled)}
            icon='navigate_next'
            onClick={handleNext}/>
          <div>de &nbsp;{pages}</div>
        </div>
      </div>
    </div>
  );
}
