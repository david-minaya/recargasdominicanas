import React, { ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';
import { Style, mergeStyle } from './select-option.module.css';
import { Icon } from '../icon/icon.component';

interface Props<T> {
  value?: T,
  label?: string,
  selected?: boolean,
  showClearIcon?: boolean,
  children: ReactNode,
  style?: Style,
  onClick?: (value?: T, label?: string) => void,
  onClear?: () => void
}

export function SelectOption<T>(props: Props<T>) {

  const {
    value,
    label,
    children,
    selected = false,
    showClearIcon = true,
    style: customStyle,
    onClick,
    onClear
  } = props;

  const style = mergeStyle(customStyle);

  function handleClick() {
    if (onClick) onClick(value, label);
  }

  function handleClear(event?: MouseEvent<HTMLDivElement>) {
    if (onClear) onClear();
    event?.stopPropagation();
  }

  return (
    <div 
      className={clsx(style.container, selected && style.selected)} 
      onMouseDown={handleClick}>
      {children}
      {showClearIcon && selected && 
        <Icon 
          className={style.icon} 
          icon='clear'
          onMouseDown={handleClear}/>
      }
    </div>
  );
}
