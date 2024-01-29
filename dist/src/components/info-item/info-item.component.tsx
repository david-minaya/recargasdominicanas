import React from 'react';
import clsx from 'clsx';
import { Style, mergeStyle } from './info-item.module.css';

interface Props {
  title: string;
  value?: string;
  color?: 'black' | 'green' | 'red';
  style?: Style;
}

export function InfoItem(props: Props) {

  const {
    title,
    value,
    color = 'black',
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  if (!value) return null;

  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <div className={clsx(style.value, style[color])}>{value}</div>
    </div>
  );
}
