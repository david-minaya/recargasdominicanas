import React from 'react';
import { OutlineButton } from '../outline-button/outline-button.component';
import { Style, mergeStyle } from './cell-button.module.css';

interface Props {
  style?: Style,
  text: string,
  onClick?: () => void
}

export function CellButton(props: Props) {

  const {
    style: customStyle,
    text,
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <OutlineButton 
      style={style} 
      text={text}
      onClick={onClick}/>
  );
}
