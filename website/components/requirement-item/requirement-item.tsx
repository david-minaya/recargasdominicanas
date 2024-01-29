import React from 'react';
import { style } from './requirement-item.module.css';

interface Props {
  image: string;
  title: string;
  description: string;
}

export function RequirementItem({ image, title, description }: Props) {
  return (
    <div className={style.requirementItem}>
      <img className={style.image} src={image}/>
      <div className={style.description}>
        <div className={style.title}>{title}</div>
        <div className={style.text}>{description}</div>
      </div>
    </div>
  );
}
