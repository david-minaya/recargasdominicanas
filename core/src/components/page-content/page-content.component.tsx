import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { style } from './page-content.module.css';

interface Props {
  className?: string,
  children: ReactNode
}

export function PageContent(props: Props) {
  const { className, children } = props;
  return (
    <div className={clsx(style.content, className)}>
      {children}
    </div>
  );
}
