import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { style } from './drawer-header.module.css';

interface Props {
  className?: string;
  children: ReactNode;
}

export function DrawerHeader(props: Props) {

  const { 
    className,
    children
  } = props;

  return (
    <div className={clsx(style.container, className)}>
      {children}
    </div>
  );
}
