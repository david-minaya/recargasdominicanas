import clsx from 'clsx';
import React from 'react';
import { BaseCell } from '../base-cell/base-cell.component';
import { style } from './cell.module.css';

interface Props<T> {
  text: T,
  weight?: 'medium' | 'bold',
  color?: 'black' | 'green' | 'gray' | 'darkgray' | 'red',
  className?: string
}

export function Cell<T>(props: Props<T>) {

  const {
    text,
    weight,
    color,
    className
  } = props;

  return (
    <BaseCell 
      className={clsx(
        style.cell,
        className,
        weight && style[weight],
        color && style[color]
      )}>
      <span>{text}</span>
    </BaseCell>
  );
}
