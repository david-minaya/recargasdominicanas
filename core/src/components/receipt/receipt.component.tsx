import React, { ReactNode } from 'react';
import { Text } from '../text/text.component';
import { Image } from '../image/image.component';
import { Style, mergeStyle } from './receipt.module.css';

interface Props {
  title: string;
  image: string;
  children: ReactNode[]
  style?: Style;
}

export function Receipt(props: Props) {

  const {
    title,
    image,
    children,
    style: customStyle,
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Image className={style.image} src={image}/>
        <Text className={style.title} text={title}/>
      </div>
      <div className={style.details}>
        {children}
      </div>
    </div>
  );
}
