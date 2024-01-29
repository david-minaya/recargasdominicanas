import clsx from 'clsx';
import React, { FormEvent } from 'react';
import { style } from './progress.module.css';

interface Props {
  value: number;
  max?: number;
  indeterminate?: boolean;
  className?: string;
  onChange?: (value: FormEvent<HTMLProgressElement>) => void;
}

export function Progress(props: Props) {

  const {
    value,
    max = 100,
    className,
    onChange
  } = props;

  return (
    <progress
      className={clsx(style.progress, className)} 
      value={value} 
      max={max}
      onChange={onChange}/>
  );
}
