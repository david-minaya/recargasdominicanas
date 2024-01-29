import React from 'react';
import { style } from './image-text-item.module.css';

interface Props {
  image: string;
  text: string;
  onClick: () => void;
}

export function ImageTextItem(props: Props) {

  const { image, text, onClick } = props;

  return (
    <div className={style.item} onClick={onClick}>
      <img className={style.image} src={image}/>
      <span className={style.text}>{text}</span>
    </div>
  );
}
