import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { style } from './page-toolbar.module.css';

interface Props {
  className?: string,
  children: ReactNode
}

export function PageToolbar(props: Props) {
  const { className, children } = props;
  return (
    <div className={clsx(style.toolbar, className)}>
      {children}
    </div>
  );
}
