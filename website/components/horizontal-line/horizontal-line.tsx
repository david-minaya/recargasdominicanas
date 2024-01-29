import React from 'react';
import clsx from 'clsx';
import { mergeStyle, Style } from './horizontal-line.module.css';

interface Props {
  style?: Style;
  disabled?: boolean;
}

export function HorizontalLine(props: Props) {

  const {
    style: customStyle,
    disabled = false
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={clsx(
      style.line, 
      disabled && style.disabled
    )}/>
  );
}
