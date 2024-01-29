import React from 'react';
import { HorizontalLine } from '../horizontal-line';
import { mergeStyle, Style } from './system-option.module.css';

interface Props {
  tag?: string;
  image: string; 
  text: string; 
  isSelected?: boolean;
  style: Style;
  onClick?: (tag: string, text: string) => void;
}

export function SystemOption(props: Props) {

  const { 
    tag, 
    text, 
    image, 
    isSelected, 
    style: customStyle, 
    onClick 
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.systemOption} onClick={() => onClick && onClick(tag, text)}>
      <img className={style.image} src={image}></img>
      <div className={style.text}>{text}</div>
      <HorizontalLine style={style.horizontalLine} disabled={!isSelected}/>
    </div>
  );
}
