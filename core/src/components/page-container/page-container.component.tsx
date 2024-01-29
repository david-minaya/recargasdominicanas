import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { style } from './page-container.module.css';

interface Props {
  className?: string,
  children: ReactNode
}

export function PageContainer(props: Props) {
  const { className, children } = props;
  return (
    <div className={clsx(style.container, className)}>
      {children}
    </div>
  );
}
