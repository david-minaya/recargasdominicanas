import clsx from 'clsx';
import React from 'react';
import { FieldError, Icon } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './select.module.css';

interface Props<T> {
  title?: string;
  value?: T;
  placeholder?: string;
  error?: string;
  className?: Style;
  onClick: () => void;
}

export function Select<T>(props: Props<T>) {

  const {
    title,
    value,
    placeholder,
    error,
    className,
    onClick
  } = props;

  const style = mergeStyle(className);

  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <div
        className={style.select}
        onClick={onClick}>
        <div 
          className={clsx(
            style.value,
            value && style.selected
          )}>
          {value || placeholder}
        </div>
        <Icon 
          className={style.icon} 
          icon='expand_more'/>
      </div>
      <FieldError message={error}/>
    </div>
  );
}
