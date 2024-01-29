import React from 'react';
import { Style, mergeStyle } from './tag.module.css';

interface Props {
  text: string;
  style?: Style;
}

export function Tag(props: Props) {

  const { 
    text,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      <div className={style.background}/>
      <span className={style.text}>{text}</span>
    </div>
  );
}
