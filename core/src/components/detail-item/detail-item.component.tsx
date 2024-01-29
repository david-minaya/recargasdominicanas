import clsx from 'clsx';
import React from 'react';
import { Text } from '../text/text.component';
import { Style, mergeStyle } from './detail-item.module.css';

interface Props {
  title: string;
  text: string;
  weight?: 'medium',
  color?: 'green',
  style?: Style;
}

export function DetailItem(props: Props) {

  const {
    title,
    text,
    weight = '',
    color = '',
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      <Text className={style.title} text={title}/>
      <Text
        text={text}
        className={clsx(
          style.text,
          style[weight],
          style[color]
        )}/> 
    </div>
  );
}
