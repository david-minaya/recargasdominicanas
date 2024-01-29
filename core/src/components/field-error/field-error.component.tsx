import React from 'react';
import clsx from 'clsx';
import { Text } from '../text/text.component';
import { style } from './field-error.module.css';

interface Props {
  message?: string,
  className?: string
}

export function FieldError(props: Props) {

  const {
    message,
    className
  } = props;

  if (!message) return null;

  return (
    <Text 
      className={clsx(style.error, className)} 
      text={message}/>
  );
}
