import React from 'react';
import clsx from 'clsx';
import { style } from './text.module.css';

interface Props<T> {
  text: T;
  className?: string;
}

export function Text<T>(props: Props<T>) {

  const { text, className } = props;

  return (
    <div 
      className={clsx(style.text, className)}
      dangerouslySetInnerHTML={{ __html: `${text}` }}/>
  );
}
