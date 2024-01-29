import React from 'react';
import { Style, mergeStyle } from './indeterminate-progress-bar.module.css';

interface Props {
  className?: Style;
  show?: boolean;
}

export function IndeterminateProgressBar(props: Props) {

  const {
    className,
    show = true
  } = props;

  const style = mergeStyle(className);

  if (!show) return null;

  return (
    <div className={style.container}>
      <div className={style.progress}/>
    </div>
  );
}
