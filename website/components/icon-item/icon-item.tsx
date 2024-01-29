import React from 'react';
import { Icon } from '../icon';
import { style } from './icon-item.module.css';

interface Props {
  icon: string;
  text: string;
}

export function IconItem({ icon, text }: Props) {
  return (
    <div className={style.iconItem}>
      <Icon icon={icon} style={style.icon}/>
      <div className={style.text}>{text}</div>
    </div>
  );
}
