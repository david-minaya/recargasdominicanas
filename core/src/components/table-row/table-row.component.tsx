import clsx from 'clsx';
import React, { Children, cloneElement, ReactNode } from 'react';
import { Style, mergeStyle } from './table-row.module.css';

interface Props {
  children: ReactNode[],
  style?: Style,
  onClick?: () => void
}

export function TableRow(props: Props) {

  const {
    children,
    style: customStyle,
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <tr className={style.row} onClick={onClick}>
      {
        Children.map(children, (child: any) => (
          child && cloneElement(child, { className: clsx(style.cell, child.props.className) })
        ))
      }
    </tr>
  );
}
