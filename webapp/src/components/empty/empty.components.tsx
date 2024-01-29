import React from 'react';
import { style } from './empty.module.css';

interface Props {
  image: string;
  title: string;
  description: string;
}

export function Empty(props: Props) {

  const {
    image,
    title,
    description
  } = props;

  return (
    <div className={style.container}>
      <img
        className={style.image} 
        src={image}/>
      <div className={style.title}>{title}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
