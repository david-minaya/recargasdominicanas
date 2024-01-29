import React from 'react';
import { DetailItem } from '@recargas-dominicanas/core/components';
import { style } from './detail-modal-item.module.css';

interface Props {
  title: string;
  text: string;
  color?: 'green';
}

export function DetailModalItem(props: Props) {

  const {
    title,
    text,
    color
  } = props;

  return (
    <DetailItem
      style={style.detailItem}
      title={title}
      text={text}
      weight='medium'
      color={color}/>
  );
}
