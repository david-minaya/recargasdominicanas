import React from 'react';
import { Image } from '../image/image.component';
import { BaseCell } from '../base-cell/base-cell.component';
import { style } from './cell-image.module.css';

interface Props {
  src: string;
  className?: string;
}

export function CellImage(props: Props) {

  const {
    src,
    className
  } = props;

  return (
    <BaseCell className={className}>
      <Image className={style.image} src={src}/>
    </BaseCell>
  );
}
