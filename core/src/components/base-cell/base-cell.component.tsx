import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { style } from './base-cell.module.css';

interface Props {
  className?: string;
  children: ReactNode;
}

export function BaseCell(props: Props) {

  const {
    className,
    children
  } = props;

  return (
    <td className={clsx(style.container, className)}>
      {children}
    </td>
  );
}
