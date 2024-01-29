import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { style } from './outline-card.module.css';

interface Props {
  children: ReactNode,
  className?: string
}

export function OutlineCard(props: Props) {

  const { children, className } = props;

  return (
    <div className={clsx(style.outlineCard, className)}>
      {children}
    </div>
  );
}
