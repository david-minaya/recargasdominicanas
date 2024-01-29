import React from 'react';
import { mergeStyle, Style } from './circle-item.module.css';

interface Props {
  image: string;
  title: string;
  description?: string[];
  style?: Style,
  onClick?: () => void;
}

export function CircleItem(props: Props) {

  const {
    image, 
    title,
    description = [],
    style: customStyle, 
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.circleItem} onClick={onClick}>
      <img className={style.image} src={image}/>
      <div className={style.title}>{title}</div>
      <div className={style.description}>
        {
          description.map((text, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: text }}></p>
          ))
        }
      </div>
    </div>
  );
}
