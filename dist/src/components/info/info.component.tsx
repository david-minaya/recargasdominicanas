import React, { ReactNode } from 'react';
import { Style, mergeStyle } from './info.module.css';

interface Props {
  title: string;
  children: ReactNode;
  style?: Style;
}

export function Info(props: Props) {

  const {
    title,
    children,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      {children}
    </div>
  );
}
