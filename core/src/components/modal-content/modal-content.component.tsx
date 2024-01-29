import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { style } from './modal-content.module.css';

interface Props {
  children: ReactNode,
  className?: string,
}

export function ModalContent(props: Props) {

  const { 
    children,
    className
  } = props;

  return (
    <div className={clsx(style.container, className)}>
      {children}
    </div>
  );
}
