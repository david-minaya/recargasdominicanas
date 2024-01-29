import React from 'react';
import { Icon } from '../icon/icon.component';
import { style } from './setting-item.module.css';

interface Props {
  icon: string;
  text: string;
  style: any;
  onClick?: () => void;
}

export function SettingItem(props: Props) {

  const { icon, text, onClick } = props;

  return (
    <div className={style.container} onClick={onClick}>
      <Icon className={style.icon} icon={icon}/>
      <div className={style.text}>{text}</div>
    </div>
  );
}
