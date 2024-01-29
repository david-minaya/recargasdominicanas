import React from 'react';
import { mergeStyle, Style } from './system-section.module.css';

interface Props {
  style?: Style;
  title: string; 
  image: string;
  description: string; 
}

export function SystemSection(props: Props) {

  const { 
    style: customStyle, 
    title, 
    image, 
    description 
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.systemSection}>
      <img className={style.image} src={image}></img>
      <div className={style.description}>
        <div className={style.title}>{title}</div>
        <div className={style.text}>{description}</div>
      </div>
    </div>
  );
}
