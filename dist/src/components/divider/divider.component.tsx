import clsx from 'clsx';
import React from 'react';
import { style } from './divider.module.css';

interface Props {
  className?: string;
}

export function Divider(props: Props) {

  const {
    className
  } = props;

  return (
    <div className={clsx(style.container, className)}/>
  );
}
